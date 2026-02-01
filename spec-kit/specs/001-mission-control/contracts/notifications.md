# Contract — Notifications

## notifications.create

**Input**

```json
{
  "mentionedAgentId": "agents:...",
  "content": "string"
}
```

**Output**

```json
{ "id": "notifications:..." }
```

**Errors**

```json
{ "code": "AGENT_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```

## notifications.markDelivered

**Input**

```json
{
  "id": "notifications:..."
}
```

**Output**

```json
{ "ok": true }
```

**Errors**

```json
{ "code": "NOTIFICATION_NOT_FOUND", "message": "string" }
```
