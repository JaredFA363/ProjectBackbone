import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // ✅ Needed for date clicks
import { expandTasks } from "../utils/recurrence";

export default function CalendarView({ tasks, onDelete, onSelectDate }) {
  const expandedTasks = expandTasks(tasks);

  const events = expandedTasks.map((t) => ({
    id: t.id,
    title: t.title,
    date: t.date,
    color: t.completed ? "green" : "blue",
  }));

  const handleEventClick = (info) => {
    if (window.confirm(`Delete task "${info.event.title}"?`)) {
      onDelete(info.event.id.split("-")[0]); // delete original task
    }
  };

  const handleDateClick = (info) => {
    // 🔥 Pass the clicked date back to App.jsx
    onSelectDate(info.dateStr);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventClick={handleEventClick}
        dateClick={handleDateClick} // ✅ enable date selection
      />
    </div>
  );
}
