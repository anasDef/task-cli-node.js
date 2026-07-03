export const getCurrentDate = () => {
  const date = new Date(Date.now());
  const dateArray = date.toString().split(" ");
  const humanReadableDate = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
  return humanReadableDate;
};

export const isFound = (id, tasksArray) => {
  const isTaskFound = tasksArray.some((task) => task.id == id);
  if (!isTaskFound) {
    console.log(`There is no task with the id: ${id}`);
  }
  return isTaskFound;
};
export const generateSimpleId = (arr) => {
  const ids = arr.map((task) => Number(task.id));
  const highestId = ids.reduce((max, current) => (current > max ? current : max), 0);
  return highestId + 1;
};