function TaskList({ taskLists, openModal, getFilteredTasks, setSelectedTask, setIsSidebarOpen, toggleCompletion, toggleImportant, deleteTask }) {
  return (
    taskLists.map((list) => (
      <div key={list} className="task-list-section">
        <h2 className="task-list-title">{list}</h2>
        <button className="add-task-button" onClick={() => openModal(list)}>
          + Add Task
        </button>
        <ul className="task-list">
          {getFilteredTasks(list).map((task) => (
            <li
              key={task.id}
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
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleCompletion(task.id, task.isCompleted)}
                />
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <span className={task.isCompleted ? "task-completed" : ""}>
                  {task.name}
                </span>
              </div>
              {task.isImportant && (
                <button
                  className="important-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImportant(task.id, task.isImportant); 
                  }}
                >
                  ⭐
                </button>
              )}
              {!task.isImportant && (
                <button
                  className="mark-important-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImportant(task.id, task.isImportant); 
                  }}
                >
                  Mark as Important
                </button>
              )}

              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))
  );
}

export default TaskList;
