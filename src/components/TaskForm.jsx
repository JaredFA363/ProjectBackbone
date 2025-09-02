import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("DAILY");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const recurrenceRule = isRecurring
      ? {
          freq: frequency,
          until: endDate || null,
        }
      : null;

    onAdd({
      title,
      date,
      isRecurring,
      recurrenceRule,
      completedDates: {}, // ✅ track per-day completion
    });

    setTitle("");
    setDate("");
    setIsRecurring(false);
    setFrequency("DAILY");
    setEndDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
    >
      <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
        />
        Recurring
      </label>

      {isRecurring && (
        <>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End date"
          />
        </>
      )}

      <button type="submit">Add</button>
    </form>
  );
}
