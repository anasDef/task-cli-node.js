# task-cli

A simple command-line tool to manage your tasks, built with Node.js.

---

## Project url
[url] (https://roadmap.sh/projects/task-tracker)

## Installation

```bash
npm install -g .
```

---

## Usage

```bash
task-cli <command> [arguments]
```

---

## Commands

### Add a task
```bash
task-cli add "Task title"
task-cli add "Task title, Task description"
```

### Update a task
```bash
task-cli update <id> "New title"
task-cli update <id> "New title, New description"
```

### Delete a task
```bash
task-cli delete <id>
```

### Mark a task
```bash
task-cli mark in-progress <id>
task-cli mark done <id>
```

### List tasks
```bash
task-cli list all
task-cli list todo
task-cli list in-progress
task-cli list done
```

### Help
```bash
task-cli --help
```

---

## Examples

```bash
# Add a task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Add a task with description
task-cli add "Buy groceries, go to the market and buy vegetables"

# Update a task
task-cli update 1 "Buy groceries and cook dinner"

# Mark as in progress
task-cli mark in-progress 1

# Mark as done
task-cli mark done 1

# List all tasks
task-cli list all

# Delete a task
task-cli delete 1
```

---

## Task Structure

Each task contains the following fields:

| Field | Description |
|---|---|
| `id` | Unique identifier |
| `title` | Task title |
| `description` | Task description (optional) |
| `status` | `todo` / `in-progress` / `done` |
| `createdAt` | Date the task was created |
| `updatedAt` | Date the task was last updated |

---

## Data Storage

All tasks are stored locally in a `database.json` file in the project directory.
