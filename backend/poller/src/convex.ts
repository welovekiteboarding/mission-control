export type ConvexClientOptions = {
  convexUrl: string;
  convexToken: string;
};

export type ConvexClient = {
  query: <TResult>(name: string, args: Record<string, unknown>) => Promise<TResult>;
  mutation: <TResult>(
    name: string,
    args: Record<string, unknown>
  ) => Promise<TResult>;
};

type ConvexResponse<TResult> =
  | { status: "success"; value: TResult }
  | { status: "error"; error: { message: string } };

const request = async <TResult>(
  url: string,
  token: string,
  payload: { path: string; args: Record<string, unknown> }
): Promise<TResult> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Convex request failed: ${response.status}`);
  }

  const data = (await response.json()) as ConvexResponse<TResult>;
  if (data.status === "error") {
    throw new Error(data.error.message);
  }

  return data.value;
};

export const createConvexClient = (
  options: ConvexClientOptions
): ConvexClient => {
  const { convexUrl, convexToken } = options;
  const baseUrl = convexUrl.replace(/\/$/, "");
  const queryUrl = `${baseUrl}/api/query`;
  const mutationUrl = `${baseUrl}/api/mutation`;

  return {
    query: (name, args) =>
      request(queryUrl, convexToken, { path: name, args }),
    mutation: (name, args) =>
      request(mutationUrl, convexToken, { path: name, args })
  };
};
