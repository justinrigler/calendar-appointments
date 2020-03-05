import { connect } from "react-redux";
import AgendaDay from "./AgendaDay";
import { closeAgenda } from "../../redux/actions";
import { filterReminders } from "../../redux/selectors";

interface Props {}

interface State {
  reminderEntities: any;
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus } = state;

  return {
    agendaStatus,
    reminders: filterReminders(state.reminderEntities, agendaStatus.date)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    }
  };
};

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;
