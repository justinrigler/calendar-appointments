import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { format } from "date-fns";

import {
  WithStyles,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px"
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px"
    },
    toolbarButtonHidden: {
      visibility: "hidden"
    },
    toolbarButtonVisible: {
      visibility: "visible"
    }
  });

interface Props extends WithStyles<typeof styles> {
  reminders: any;
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose, reminders } = props;
  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <List>
          {reminders.map(reminder => (
            <ListItem>
              <Avatar style={{ backgroundColor: reminder.color }} />
              <ListItemText
                primary={reminder.title}
                secondary={format(reminder.datetime, "hh:mm a")}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
