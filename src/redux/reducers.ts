import { combineReducers } from "redux"
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  CREATE_REMINDER,
  UPDATE_ADD_REMINDER
} from "./actions"

const initialAgendaState = {
  isOpen: false,
  date: null
}

const initialAddReminderState = {
  isOpen: false,
  formValues: {
    title: "",
    datetime: null,
    color: "#bbbbbb" // ribs
  }
}

// Simplifies connecting container components, and passing reminders as props
const initialReminderEntitiesState = {
  byId: {},
  allIds: []
}

function agendaStatus(state = initialAgendaState, action: any) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date
      }
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null
      }
    default:
      return state
  }
}

function addReminderStatus(state = initialAddReminderState, action: any) {
  switch (action.type) {
    // Update these actions to accommodate new state (doh!)
    case OPEN_ADD_REMINDER:
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_ADD_REMINDER:
      return {
        ...state,
        isOpen: false
      }
    // On update action from the reminder form, merge the incoming values with the existing values
    case UPDATE_ADD_REMINDER:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.formValues
        }
      }
    case CREATE_REMINDER: {
      return initialAddReminderState
    }
    default:
      return state
  }
}

function reminderEntities(state = initialReminderEntitiesState, action: any) {
  switch (action.type) {
    // On reminder creation, merge the reminder into the dictionary and add its id to the list
    // Use concat to conveniently return a new array
    case CREATE_REMINDER: {
      const id = state.allIds.length
      return {
        byId: {
          ...state.byId,
          [id]: { id, ...action.reminder }
        },
        allIds: state.allIds.concat([id])
      }
    }
    default:
      return state
  }
}

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
  reminderEntities
})

export default calendarApp
