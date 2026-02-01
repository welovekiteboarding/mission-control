# Contract — Messages

## messages.create

**Input**

```json
{
  "taskId": "tasks:...",
  "fromAgentId": "agents:...",
  "content": "string",
  "attachments": ["documents:..."]
}
```

**Output**

```json
{ "id": "messages:..." }
```

**Side Effects**

- Auto‑subscribe `fromAgentId` to `taskId` if a subscription does not exist.
- Emit activity entry for `message_sent`.

**Errors**

```json
{ "code": "TASK_NOT_FOUND" | "AGENT_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```
