import { RRule } from "rrule";

// Convert a task with recurrence into multiple events
export function expandRecurringTask(task) {
  if (!task.isRecurring || !task.recurrenceRule) return [task];

  const startDate = new Date(task.date);

  const options = {
    freq: RRule[task.recurrenceRule.freq], // DAILY, WEEKLY, MONTHLY
    dtstart: startDate,
    until: task.recurrenceRule.until ? new Date(task.recurrenceRule.until) : null,
  };

  const rule = new RRule(options);

  const dates = rule.all();

  return dates.map(d => ({
    ...task,
    id: `${task.id}-${d.toISOString()}`, // unique ID for each occurrence
    date: d.toISOString().split("T")[0],
  }));
}

// Expand all tasks (both normal + recurring)
export function expandTasks(tasks) {
  return tasks.flatMap(t => expandRecurringTask(t));
}
