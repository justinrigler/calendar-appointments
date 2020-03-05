import { isSameDay, compareAsc } from "date-fns";

export const filterReminders = ({ byId, allIds }, date) => {
  return allIds
    .map(id => byId[id]) // Get a list of reminders
    .filter(reminder => {
      // Pull out reminders for the current date
      return isSameDay(reminder.datetime, date);
    })
    .sort(compareAsc); // Ensure correct order
};
