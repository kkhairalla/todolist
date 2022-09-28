import React from 'react';
import { Task } from '../interfaces';

interface TodoTaskProps {
  task: Task;
  onCompleteTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, onCompleteTask }: TodoTaskProps) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.priority}</span>
      </div>
      <button
        onClick={() => {
          onCompleteTask(task.taskName);
        }}
      >
        x
      </button>
    </div>
  );
};

export default TodoTask;
