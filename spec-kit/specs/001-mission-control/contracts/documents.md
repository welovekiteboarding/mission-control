# Contract — Documents

## documents.create

**Input**

```json
{
  "title": "string",
  "content": "string",
  "type": "deliverable|research|protocol|other",
  "taskId": "tasks:..." 
}
```

**Output**

```json
{ "id": "documents:..." }
```

**Side Effects**

- Auto‑subscribe the document author (implicit via calling context) to `taskId` if not already subscribed.
- Emit activity entry for `document_created`.

**Errors**

```json
{ "code": "TASK_NOT_FOUND" | "VALIDATION_ERROR", "message": "string" }
```
