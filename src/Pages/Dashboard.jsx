import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dbjson from '../db.json'
import { auth,db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import TaskDetailsSidebar from "../components/Taskdetails";
import TaskList from "../components/TaskList";

function Dashboard({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [sections] = useState(dbjson.sections);
  const [selectedSection, setSelectedSection] = useState("Tasks");
  const [selectedTaskList, setSelectedTaskList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const taskList = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((task) => task.userId === userId);
    setTasks(taskList);
  };
  useEffect(() => {
    fetchTasks(userId);
  }, [userId]);

  const getTasksForDate = (date) => {
    const selectedDateString = date.toISOString().split("T")[0];
    return tasks.filter(
      (task) => task.dueDate.split("T")[0] === selectedDateString
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const taskLists = ["Personal", "Work"];

  const toggleImportant = async (taskId, isImportant) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { isImportant: !isImportant });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleCompletion = async (taskId, isCompleted) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { isCompleted: !isCompleted });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const openModal = (list) => {
    setSelectedTaskList(list);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDueDate("");
  };

  const addTask = async () => {

    if (!newTaskName || !newTaskDescription || !newTaskDueDate) {
      setError("Please fill in all fields.");
      return;
    }

    if (newTaskName.trim()) {
      await addDoc(collection(db, "tasks"), {
        name: newTaskName,
        desc: newTaskDescription,
        list: selectedTaskList,
        isImportant: false,
        isCompleted: false,
        dueDate: newTaskDueDate,
        userId: userId,
      });
      fetchTasks(userId);
      closeModal();
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logging out
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const getFilteredTasks = (list) => {
    const today = new Date().toLocaleDateString();

    switch (selectedSection) {
      case "My Day":
        return tasks.filter(
          (task) =>
            task.list === list &&
            !task.isCompleted &&
            new Date(task.dueDate).toLocaleDateString() === today
        );
      case "Important":
        return tasks.filter((task) => task.isImportant && task.list === list);
      case "Assigned To Me":
        return tasks.filter((task) => task.list && task.list === list);
      case "Planned":
        return tasks.filter((task) => !task.isCompleted && task.list === list);
      case "Tasks":
        return tasks.filter((task) => task.list === list);
      default:
        return [];
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  return (
    <div className="dashboard-container">
      <Sidebar sections={sections} selectedSection={selectedSection} setSelectedSection={setSelectedSection} isSidebarExpanded={isSidebarExpanded} handleLogout={handleLogout} logo={logo} setIsSidebarExpanded={setIsSidebarExpanded} />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="section-title">{selectedSection}</h1>
        <h2 className="current-date">{formattedDate}</h2>
        {selectedSection === "Planned" ? (
          <div className="planned-section">
            <h2>Planned Tasks</h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />
            <h3>Tasks for {selectedDate.toDateString()}</h3>
            <ul className="task-list">
              {getTasksForDate(selectedDate).map((task) => (
                <li key={task.id} className="task-item">
                  <span>{task.name}</span>
                  {task.isImportant && <span className="important-tag">⭐</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p></p>
        )}
        <TaskList taskLists={taskLists} openModal={openModal} getFilteredTasks={getFilteredTasks} setSelectedTask={setSelectedTask} setIsSidebarOpen={setIsSidebarOpen} toggleCompletion={toggleCompletion} toggleImportant={toggleImportant} deleteTask={deleteTask} />
      </div>
      <Modal error={error} isModalOpen={isModalOpen} closeModal={closeModal} addTask={addTask} newTaskName={newTaskName} newTaskDescription={newTaskDescription} newTaskDueDate={newTaskDueDate} setNewTaskDescription={setNewTaskDescription} setNewTaskDueDate={setNewTaskDueDate} setNewTaskName={setNewTaskName} selectedTaskList={selectedTaskList} />
      <TaskDetailsSidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} selectedTask={selectedTask} />
    </div >
  );
}

export default Dashboard;
