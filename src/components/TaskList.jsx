import { expandTasks } from "../utils/recurrence";
import { quotes } from "../utils/quotes";

export default function TaskList({ tasks, onToggle, onDelete }) {
  const today = new Date().toISOString().split("T")[0];
  const expandedTasks = expandTasks(tasks);
  const todaysTasks = expandedTasks.filter(t => t.date === today);

  const allDone = todaysTasks.length > 0 && todaysTasks.every(t => t.completed);

  // Pick a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div>
      <h2>✅ Today’s Tasks</h2>

      {todaysTasks.length === 0 && <p>No tasks today!</p>}

      {todaysTasks.length > 0 && (
        <ul>
          {todaysTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id.split("-")[0])}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </span>
              <button
                onClick={() => onDelete(task.id.split("-")[0])}
                style={{ marginLeft: "8px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Show success message + quote */}
      {allDone && (
        <div style={{ marginTop: "16px", padding: "12px", border: "1px solid green" }}>
          <h3 style={{ color: "green" }}>🎉 Well done! You completed all your tasks today.</h3>
          <p style={{ fontStyle: "italic", marginTop: "8px" }}>"{randomQuote}"</p>
        </div>
      )}
    </div>
  );
}
