import { connect } from "react-redux";
import AddReminder from "./AddReminder";
import {
  closeAddReminder,
  createReminder,
  ReminderObj,
  FormValues,
  updateAddReminder
} from "../../redux/actions";

interface State {
  addReminderStatus: {
    isOpen: boolean;
    formValues: FormValues;
  };
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.addReminderStatus.isOpen,
    formValues: state.addReminderStatus.formValues
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createReminder: (reminder: ReminderObj) => {
      dispatch(createReminder(reminder));
    },
    updateAddReminder: (formValues: FormValues) => {
      dispatch(updateAddReminder(formValues));
    },
    onClose: () => {
      dispatch(closeAddReminder());
    }
  };
};

const AddReminderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);

export default AddReminderContainer;
