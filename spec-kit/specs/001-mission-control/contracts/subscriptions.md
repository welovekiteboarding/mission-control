# Contract — Subscriptions

## subscriptions.subscribe

**Input**

```json
{
  "taskId": "tasks:...",
  "agentId": "agents:..."
}
```

**Output**

```json
{ "ok": true }
```

**Errors**

```json
{ "code": "TASK_NOT_FOUND" | "AGENT_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```

## subscriptions.unsubscribe

**Input**

```json
{
  "taskId": "tasks:...",
  "agentId": "agents:..."
}
```

**Output**

```json
{ "ok": true }
```

**Errors**

```json
{ "code": "SUBSCRIPTION_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```
