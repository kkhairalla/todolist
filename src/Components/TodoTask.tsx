import React from 'react';
import { Task } from '../interfaces';
import styled from 'styled-components';

const colors = {
  red: 'tomato'
};

interface TodoTaskProps {
  task: Task;
  onCompleteTask(taskNameToDelete: string): void;
}

const DeleteCTA = styled.button`
  flex: 20%;
  height: 100%;
  border: none;
  background-color: ${colors.red};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: white;
  cursor: pointer;
`;

const Row = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  color: white;
  margin: 15px;
`;

const Content = styled.div`
  flex: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cell = styled.span`
  display: grid;
  place-items: center;
  border: 1px solid #d3d3d3;
  width: 100%;
  height: 100%;
  font-size: 18px;
  border-right: none;
  background-color: gray;
`;

const TodoTask = ({ task, onCompleteTask }: TodoTaskProps) => {
  return (
    <Row>
      <Content>
        <Cell>{task.taskName}</Cell>
        <Cell>{task.priority}</Cell>
      </Content>
      <DeleteCTA
        onClick={() => {
          onCompleteTask(task.taskName);
        }}
      >
        x
      </DeleteCTA>
    </Row>
  );
};

export default TodoTask;
