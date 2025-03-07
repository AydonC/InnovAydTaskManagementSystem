import React from "react";

function TaskItem({ task, setSelectedTask, setIsSidebarOpen, toggleCompletion, toggleImportant }) {
  return (
    <li
      className="task-item"
      onClick={() => {
        setSelectedTask(task);
        setIsSidebarOpen(true);
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleCompletion(task.id)}
        />
        <span className={task.isCompleted ? "task-completed" : ""}>{task.name}</span>
      </div>
      {task.isImportant && <button onClick={(e) => e.stopPropagation() && toggleImportant(task.id)}>⭐</button>}
      {!task.isImportant && <button onClick={(e) => e.stopPropagation() && toggleImportant(task.id)}>Mark as Important</button>}
    </li>
  );
}

export default TaskItem;
