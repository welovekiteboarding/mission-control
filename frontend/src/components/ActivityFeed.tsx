import { Activity, useQuery } from "../services/convex";

export const ActivityFeed = () => {
  const activities = useQuery("activities.list") as Activity[];
  return (
    <section className="glass-panel p-6 space-y-4">
      <div>
        <p className="section-title">Activity</p>
        <h3 className="text-xl font-semibold">Live Feed</h3>
      </div>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-sm text-white/40">No activity yet.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-white/10 bg-midnight/70 p-3 text-sm"
            >
              <p className="text-white/80">{activity.summary}</p>
              <p className="mt-1 text-xs text-white/40">
                {new Date(activity.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
