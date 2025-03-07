import React from "react";

function TaskDetailsSidebar({ selectedTask, isSidebarOpen,setIsSidebarOpen }) {
  if (!selectedTask) return null;

  return (
   
      isSidebarOpen && selectedTask && (
        <div className="task-details-sidebar">
          <h3>Task Details</h3>
          <p><strong>Title:</strong> {selectedTask.name}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          <p><strong>Description</strong> {selectedTask.desc}</p>
          <button
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
        </div>
      )
    
  );
}

export default TaskDetailsSidebar;
