// action types
export const OPEN_AGENDA = "OPEN_AGENDA";
export const CLOSE_AGENDA = "CLOSE_AGENDA";
export const OPEN_ADD_REMINDER = "OPEN_ADD_REMINDER";
export const CLOSE_ADD_REMINDER = "CLOSE_ADD_REMINDER";
// Add an event for user input - easy to store form in redux over using hooks
export const UPDATE_ADD_REMINDER = "UPDATE_ADD_REMINDER";
export const CREATE_REMINDER = "CREATE_REMINDER";

interface DateObj {
  date: Date;
}

export interface ReminderObj {
  title: string;
  date: Date;
  time: Date;
  color: string;
}

export interface FormValues {
  title?: string;
  datetime?: Date;
  color?: string;
}

// action creators
export function openAgenda(dateObj: DateObj) {
  return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
  return { type: CLOSE_AGENDA };
}

export function openAddReminder(reminder?: any) {
  return { type: OPEN_ADD_REMINDER, payload: reminder }; // Changed "reminder" key to payload for consistency
}

export function closeAddReminder() {
  return { type: CLOSE_ADD_REMINDER };
}

export function updateAddReminder(formValues: FormValues) {
  // TODO: formalize input type
  return { type: UPDATE_ADD_REMINDER, formValues };
}

export function createReminder(reminder: ReminderObj) {
  return { type: CREATE_REMINDER, reminder };
}
