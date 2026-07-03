import fs, { read } from "node:fs";
import { getCurrentDate, isFound, generateSimpleId } from "./helpers.js";


const readFromDB = () => JSON.parse(fs.readFileSync("./database.json", "utf8"));

const writeAtDB = (newTasksArray) =>
  fs.writeFileSync("./database.json", JSON.stringify(newTasksArray), "utf8");


export const addTaskToDB = (task) => {
  let readDB = readFromDB();

  const [title, description] = task.split(","); 

  if (!title) {
    console.log("enter the task title");
    return;
  }

  const taskObject = {
    id:generateSimpleId(readDB),
    title: title,
    description: description ? description : "_",
    status: "todo",
    createdAt: getCurrentDate(),
    updatedAt: "",
  };

  readDB.push(taskObject);
  writeAtDB(readDB);
  console.log(`Task added successfully (ID: ${taskObject.id})`);
};


export const updateTask = (id, newTask) => {
  let readDB = readFromDB();
  const [title, description] = newTask.split(",");

  if (!title) {
    console.log("enter the task title");
    return;
  }

  if (!isFound(id, readDB)) return;

  const newTasksArray = readDB.map((task) =>
    task.id == id
      ? {
          ...task,
          title,
          description: description ? description : "_",
          updatedAt: getCurrentDate(),
        }
      : task,
  );

  writeAtDB(newTasksArray);
};

export const deleteTask = (id) => {
  let readDB = readFromDB();

  if (!isFound(id, readDB)) return;

  writeAtDB(readDB.filter((task) => task.id != id));
  console.log(`The task with id ${id} has been deleted`);
};

export const markTask = (status, id) => {
  let readDB = readFromDB();

  if (!isFound(id, readDB)) return;

  const newTasksArray = readDB.map((task) =>
    task.id == id ? { ...task, status } : task,
  );

  writeAtDB(newTasksArray);
  console.log(`The task with id has been marked as ${status}`);
};

export const listTasks = (status) => {
  const readDB = readFromDB();
  if(status === "all") {
    readDB.map(task => {
        console.log(`
      task id: ${task.id} ,\n
      task title: ${task.title} ,\n
      task description: ${task.description} , \n
      task status: ${task.status} , \n
      task created at: ${task.createdAt} , \n
      tasks updated at: ${task.updatedAt} \n
      =====================================  
    `);
    })
  }
  const currentTasks = readDB.filter((task) => task.status === status);
  currentTasks.map((task) => {
    console.log(`
      task id: ${task.id} ,\n
      task title: ${task.title} ,\n
      task description: ${task.description} , \n
      task status: ${task.status} , \n
      task created at: ${task.createdAt} , \n
      tasks updated at: ${task.updatedAt} \n
      =====================================  
    `);
  });
};
