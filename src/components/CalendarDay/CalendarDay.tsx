import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import { isSameMonth, isSameDay, getDate } from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer"
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer"
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent"
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400]
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1"
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800]
    },
    remindersContainer: {
      height: "100%"
    },
    reminderChip: {
      margin: theme.spacing.unit
    }
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  reminders: any;
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
  const [focused, setFocused] = useState(false);

  const isToday = isSameDay(dateObj.date, new Date());
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  // Cap reminders on calender and show a teaser for missing values
  const remindersSummary = reminders.slice(0, 5);
  if (remindersSummary.length === 5) {
    reminders[4].title = ["..."];
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {/* Map over reminders - apply color using style because Chip doesn't support colors ;) */}
        {remindersSummary.map(reminder => (
          <Chip
            key={reminder.id}
            className={classes.reminderChip}
            style={{ backgroundColor: reminder.color }}
            label={reminder.title[0].toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
