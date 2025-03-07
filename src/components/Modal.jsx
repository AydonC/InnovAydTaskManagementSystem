import React from "react";

function Modal({error={error}, isModalOpen, closeModal, addTask, newTaskName, setNewTaskName, newTaskDescription, setNewTaskDescription, newTaskDueDate, setNewTaskDueDate, selectedTaskList }) {
  if (!isModalOpen) return null;

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <h3>Add Task to {selectedTaskList}</h3>

          <input
            type="text"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            required
          />

          <textarea
            placeholder="Task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            required
          />

          Due Date:
          <input
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            required
          />
           {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="modal-actions">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      </div>
    )
  
  );
}

export default Modal;
