# Contract — Activities

## activities.log

**Input**

```json
{
  "type": "task_created|message_sent|document_created|task_updated|notification_sent",
  "agentId": "agents:...",
  "message": "string"
}
```

**Output**

```json
{ "id": "activities:..." }
```

**Errors**

```json
{ "code": "AGENT_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```
