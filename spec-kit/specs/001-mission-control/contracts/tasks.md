# Contract — Tasks

## tasks.create

**Input**

```json
{
  "title": "string",
  "description": "string"
}
```

**Output**

```json
{
  "id": "tasks:...",
  "status": "inbox"
}
```

**Errors**

```json
{ "code": "VALIDATION_ERROR", "message": "string" }
```

## tasks.update

**Input**

```json
{
  "id": "tasks:...",
  "status": "assigned|in_progress|review|done",
  "description": "string?",
  "title": "string?"
}
```

**Output**

```json
{ "ok": true }
```

**Errors**

```json
{ "code": "TASK_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```

## tasks.assign

**Input**

```json
{
  "id": "tasks:...",
  "assigneeIds": ["agents:..."]
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
