import React, { FC, useState, ChangeEvent } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [priority, setPriority] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target.name === 'task'
      ? setTaskName(event.target.value)
      : setPriority(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask: ITask = { taskName: taskName, priority: priority };
    setTodoList([...todoList, newTask]);
    setTaskName('');
    setPriority(0);
  };

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
      document.getElementById('persistLink')?.click();
    }
  };

  return (
    <div className="App">
      <div className="header">
        <button
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
            onChange={handleChange}
            value={taskName}
          />
          <input
            type="number"
            name="priority"
            value={priority}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
