export function expandTasks(tasks) {
  const expanded = [];

  tasks.forEach((task) => {
    const baseId = task.id;
    const startDate = new Date(task.date);
    const endDate = task.recurrenceRule?.until
      ? new Date(task.recurrenceRule.until)
      : startDate;

    let current = new Date(startDate);

    while (current <= endDate) {
      const dayStr = current.toISOString().split("T")[0];

      expanded.push({
        ...task,
        id: `${baseId}-${dayStr}`,
        date: dayStr,
        completed: !!task.completedDates?.[dayStr], // ✅ per-day state
      });

      if (!task.isRecurring) break;

      if (task.recurrenceRule.freq === "DAILY") {
        current.setDate(current.getDate() + 1);
      } else if (task.recurrenceRule.freq === "WEEKLY") {
        current.setDate(current.getDate() + 7);
      } else if (task.recurrenceRule.freq === "MONTHLY") {
        current.setMonth(current.getMonth() + 1);
      }
    }
  });

  return expanded;
}
