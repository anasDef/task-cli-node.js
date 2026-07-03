#!/usr/bin/env node

import {
  addTaskToDB,
  updateTask,
  deleteTask,
  markTask,
  listTasks,
} from "./todo.js";

const command = process.argv[2];
const argumentOne = process.argv[3]; // maybe the id or text
const argumentTwo = process.argv[4]; // only text in case of update command

const helpMessage = `
    Usage: task-cli <command> [arguments]

    Commands:
    add <title, description>   Add a new task
    update <id> <title>        Update a task
    delete <id>                Delete a task
    mark <status> <id>         Mark a task (in-progress / done)
    list [status]              List tasks (status: todo | in-progress | done | all)

    Examples:
    task-cli add "Buy groceries, go to the market to buy some vegetables."
    task-cli update 1 "Buy groceries and cook dinner"
    task-cli mark done 1
    task-cli list in-progress
`;

switch (command) {
  case "add": {
    if (argumentOne) {
      console.log(argumentOne);
      addTaskToDB(argumentOne);
    } else console.log("please enter your task");
    break;
  }

  case "update": {
    if (/[0-9]/.test(argumentOne)) {
      if (argumentTwo) updateTask(argumentOne, argumentTwo);
    } else console.log(`Enter the id first then the updated task`);

    break;
  }

  case "delete": {
    if (!/[0-9]/.test(argumentOne)) {
      console.log("Enter the task id");
      break;
    }
    deleteTask(argumentOne);
    break;
  }

  case "mark": {
    if (
      argumentOne == "in-progress" ||
      argumentOne == "done" && /[0-9]/.test(argumentTwo)
    ) {
      markTask(argumentOne, argumentTwo);
      break;
    }
    console.log("type the task status then the id");
    break;
  }

  case "list": {
    if (
      argumentOne == "all" ||
      argumentOne == "done" ||
      argumentOne == "in-progress" ||
      argumentOne == "todo"
    ) {
      listTasks(argumentOne);
      break;
    }
    console.log("enter a valid status");
    break;
  }

  case "--help": {
    console.log(helpMessage);
    break;
  }

  default: {
    console.log("please enter a command, for help type --help");
  }
}
