import React, { FC, useState, ChangeEvent } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target.name === 'task'
      ? setTask(event.target.value)
      : setDeadline(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask: ITask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask('');
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const saveToFile = () => {};

  return (
    <div className="App">
      <div className="header">
        <button className="persistButton" onClick={saveToFile}>
          Persist Data
        </button>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            onChange={handleChange}
            value={task}
          />
          <input
            type="number"
            placeholder="Deadline in hours"
            name="deadline"
            value={deadline}
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
