import './App.css';
import { AppUI } from './appUI'
import { useState } from 'react';

// const defaultTasks = [
//   {text: 'buy onions', completed: true},
//   {text: 'call mom', completed: false},
//   {text: 'Read work emails', completed: false}
// ]

function App() {
  const localStorageTasks = localStorage.getItem('TASKS_V1')
  let parsedTaks
  //checking local storage
  if(!localStorageTasks) {
    localStorage.setItem('TASKS_V1', JSON.stringify([]))
    parsedTaks = []
  } else {
    parsedTaks = JSON.parse(localStorageTasks)
  }

  const [tasks, setTasks] = useState(parsedTaks)
  const [searchValue, setSearchValue] = useState('')

  const completedTasks = tasks.filter(task => !!task.completed).length
  const totalTasks = tasks.length

  // Task filtering on search
  let searchedTasks = []
  if(!searchValue.length >= 1) {
    searchedTasks = tasks
  } else {
    searchedTasks = tasks.filter(task => {
      const taskText = task.text.toLowerCase()
      const searchText = searchValue.toLowerCase()
      return taskText.includes(searchText)
    })
  }

  const saveTasks = (newTasks) => {
    const stringifiedTasks = JSON.stringify(newTasks)
    localStorage.setItem('TASKS_V1', stringifiedTasks)
    setTasks(newTasks)
  }

  // marking task as completed
  const markCompleteTask = (text) => {
    const taskIndex = tasks.findIndex(task => task.text === text)
    const newTasks = [...tasks]
    newTasks[taskIndex].completed = true

    saveTasks(newTasks)
  }

  // deleting task
  const deleteTask = (text) => {
    const taskIndex = tasks.findIndex(task => task.text === text)
    const newTasks = [...tasks]
    newTasks.splice(taskIndex, 1)

    saveTasks(newTasks)
  }

  return (
    <AppUI
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTasks={searchedTasks}
      markCompleteTask={markCompleteTask}
      deleteTask={deleteTask}
    />
  );
}

export default App;
