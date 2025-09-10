import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState({
    todo: ["Learn React", "Set up Backend"],
    inProgress: ["Build Kanban Board"],
    done: ["Install Vite"],
  });

  const [newTask, setNewTask] = useState("");

  // Drag start
  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("fromColumn", column);
  };

  // Drop task into column
  const handleDrop = (e, toColumn) => {
    const task = e.dataTransfer.getData("task");
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (fromColumn === toColumn) return;

    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks[fromColumn] = newTasks[fromColumn].filter((t) => t !== task);
      newTasks[toColumn] = [...newTasks[toColumn], task];
      return newTasks;
    });
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Add a new task
  const handleAddTask = (column) => {
    if (!newTask.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask.trim()],
    }));
    setNewTask("");
  };

  // Delete a task
  const handleDeleteTask = (column, task) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t !== task),
    }));
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="board">
        {Object.keys(tasks).map((column) => (
          <div
            key={column}
            className="column"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, column)}
          >
            <h2>{column.toUpperCase()}</h2>

            {/* Add task form */}
            <div className="add-task">
              <input
                type="text"
                value={newTask}
                placeholder="New task..."
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={() => handleAddTask(column)}>Add</button>
            </div>

            {/* Task list */}
            {tasks[column].map((task, index) => (
              <div
                key={index}
                className="task"
                draggable
                onDragStart={(e) => handleDragStart(e, task, column)}
              >
                {task}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(column, task)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



