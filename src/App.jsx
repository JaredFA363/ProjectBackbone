import { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // default to today
  );

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now().toString(), completedDates: {} },
    ]);
  };

  const toggleComplete = (id, date) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completedDates: {
                ...t.completedDates,
                [date]: !t.completedDates?.[date],
              },
            }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Save tasks to a file
  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Load tasks from a file
  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setTasks(imported);
        } else {
          alert("Invalid file format");
        }
      } catch {
        alert("Error reading file");
      }
    };
    reader.readAsText(file);
  };

  // ✨ your ground rules
  const groundRules = [
    "Stay consistent, even when motivation fades.",
    "One task at a time — focus matters.",
    "Completion is better than perfection.",
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">📅 Project-Backbone Calendar</h1>

      {/* Ground Rules toggle button */}
      <button onClick={() => setShowRules(!showRules)}>
        {showRules ? "Hide Ground Rules" : "Show Ground Rules"}
      </button>

      {/* Ground Rules section */}
      {showRules && (
        <div
          style={{ marginTop: "12px", padding: "12px", border: "1px solid gray" }}
        >
          <h2>📖 Ground Rules</h2>
          <ul>
            {groundRules.map((rule, index) => (
              <li key={index}>• {rule}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "12px" }}>
        <button onClick={exportTasks} style={{ marginRight: "8px" }}>
          💾 Export Tasks
        </button>

        <label style={{ cursor: "pointer" }}>
          📂 Import Tasks
          <input
            type="file"
            accept="application/json"
            onChange={importTasks}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Existing functionality */}
      <TaskForm onAdd={addTask} defaultDate={selectedDate} />
      <CalendarView
        tasks={tasks}
        onDelete={deleteTask}
        onSelectDate={setSelectedDate}
      />
      <TaskList
        tasks={tasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
