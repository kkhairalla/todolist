import React, { useState, ChangeEvent } from 'react';
import TodoTask from './Components/TodoTask';
import type { Task } from './interfaces';
import styled, { createGlobalStyle } from 'styled-components';
import initialList from './import/todos.json';

export const RootGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
`;

const Header = styled.form`
  flex: 25%;
  background-color: gray;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 70px;
  height: 84px;
  border: none;
  padding-left: 10px;
  cursor: pointer;
`;

const PersistButton = styled(Button)`
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`;

const SubmitButton = styled(Button)`
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  border: none;
  padding-left: 10px;
`;

const TodoList = styled.div`
  flex: 75%;
  width: 100%;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  padding-top: 50px;
  flex-direction: column;
`;

const App = () => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(0);
  const [todoList, setTodoList] = useState<Task[]>(initialList);

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

  const handleCompleteTask = (taskNameToDelete: string): void => {
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
      window.setTimeout(() => {
        URL.revokeObjectURL(url);
        link?.remove();
      }, 1000);
    }
  };

  return (
    <AppContainer>
      <RootGlobalStyle />
      <Header onSubmit={handleFormSubmit}>
        <PersistButton
          type="button"
          disabled={todoList.length < 1}
          onClick={saveToFile}
        >
          Persist Data
        </PersistButton>
        <InputContainer>
          <Input
            type="text"
            placeholder="Task..."
            name="task"
            onChange={handleTaskChange}
            value={taskName}
          />
          <Input
            type="number"
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
          />
        </InputContainer>
        <SubmitButton type="submit">Add Task</SubmitButton>
      </Header>
      <TodoList>
        {todoList.map((task: Task, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              onCompleteTask={handleCompleteTask}
            />
          );
        })}
      </TodoList>
    </AppContainer>
  );
};

export default App;
