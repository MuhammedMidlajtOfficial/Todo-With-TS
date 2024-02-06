import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks : Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener('submit', event => {
  event.preventDefault();

  const taskTitle = input?.value.trim();
  if (!taskTitle) return;

  const newTask: Task = {
    id: '1',
    title: taskTitle,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask);
  input!.value = ''; 
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', ()=>{
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = 'checkbox';
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(){
  localStorage.setItem('TASKS',JSON.stringify(tasks))
}

function loadTasks() : Task[] {
  const taskJSON = localStorage.getItem('TASKS')
  if(!taskJSON) return  []
  return JSON.parse(taskJSON)
}