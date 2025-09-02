import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { expandTasks } from "../utils/recurrence";

export default function CalendarView({ tasks, onDelete }) {
  const expandedTasks = expandTasks(tasks);

  const events = expandedTasks.map(t => ({
    id: t.id,
    title: t.title,
    date: t.date,
    color: t.completed ? "green" : "blue"
  }));

  const handleEventClick = (info) => {
    if (window.confirm(`Delete task "${info.event.title}"?`)) {
      onDelete(info.event.id.split("-")[0]); // delete original task
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventClick={handleEventClick}
      />
    </div>
  );
}
