import { expandTasks } from "../utils/recurrence";
import { quotes } from "../utils/quotes";

export default function TaskList({ tasks, selectedDate, onToggle, onDelete }) {
  const expandedTasks = expandTasks(tasks);
  const todaysTasks = expandedTasks.filter((t) => t.date === selectedDate);

  const allDone = todaysTasks.length > 0 && todaysTasks.every((t) => t.completed);

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div>
      <h2>✅ Tasks for {selectedDate}</h2>

      {todaysTasks.length === 0 && <p>No tasks for this day!</p>}

      {todaysTasks.length > 0 && (
        <ul>
          {todaysTasks.map((task) => {
            const baseId = task.id.split("-")[0];
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(baseId, task.date)}
                />
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </span>
                <button
                  onClick={() => onDelete(baseId)}
                  style={{ marginLeft: "8px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {allDone && (
        <div style={{ marginTop: "16px", padding: "12px", border: "1px solid green" }}>
          <h3 style={{ color: "green" }}>🎉 Well done! You completed all your tasks today.</h3>
          <p style={{ fontStyle: "italic", marginTop: "8px" }}>"{randomQuote}"</p>
        </div>
      )}
    </div>
  );
}
