import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { openAgenda } from "../../redux/actions";
import { filterReminders } from "../../redux/selectors";

interface Props {
  calenderDate: Date;
}

interface State {
  reminderEntities: any;
}

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: any) => {
  return {
    ...state,
    reminders: filterReminders(state.reminderEntities, ownProps.dateObj.date),
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj));
    }
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
