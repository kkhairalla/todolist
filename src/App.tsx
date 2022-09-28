import React, { useState, ChangeEvent } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { Task } from './interfaces';

const App = () => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(0);
  const [todoList, setTodoList] = useState<Task[]>([]);

  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(event.target.value));
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addTask();
  };

  const addTask = (): void => {
    const newTask: Task = { taskName, priority };
    setTodoList([...todoList, newTask]);
    setTaskName('');
    setPriority(0);
  };

  // hanler draus
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const saveToFile = () => {
    if (todoList.length > 0) {
      const jsonse = JSON.stringify(todoList);
      const blob = new Blob([jsonse], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'todos.json';
      a.style.visibility = 'hidden';
      a.id = 'persistLink';

      document.body.appendChild(a);

      const link = document.getElementById('persistLink');
      link?.click();
      // timeout: incl. revoke URL
      link?.remove();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <div className="header">
          <button
            type="button"
            disabled={todoList.length < 1}
            className="persistButton"
            onClick={saveToFile}
          >
            Persist Data
          </button>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Task..."
              name="task"
              onChange={handleTaskChange}
              value={taskName}
            />
            <input
              type="number"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
            />
          </div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <div className="todoList">
        {todoList.map((task: Task, key: number) => {
          return (
            <TodoTask key={key} task={task} onCompleteTask={completeTask} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
