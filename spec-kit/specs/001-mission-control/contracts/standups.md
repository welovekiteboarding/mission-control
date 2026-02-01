# Contract — Standups

## standups.generate

**Input**

```json
{
  "date": "string" // ISO date YYYY-MM-DD
}
```

**Output**

```json
{
  "summary": "string",
  "completedTasks": ["tasks:..."],
  "inProgressTasks": ["tasks:..."],
  "blockedTasks": ["tasks:..."],
  "keyDecisions": ["string"]
}
```

**Side Effects**

- Posts summary to configured Slack delivery target.

**Errors**

```json
{ "code": "VALIDATION_ERROR", "message": "string" }
```
