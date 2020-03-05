import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import { ReminderObj, FormValues } from "../../redux/actions";

// Using outdated library for compatibility with codebase
import { InlineDateTimePicker } from "material-ui-pickers";

// Using react-color for its awesome pickers
import { CirclePicker } from "react-color";

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column"
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px"
    },
    gridItem: {
      padding: theme.spacing.unit * 4
    }
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  formValues: FormValues;
  createReminder: (reminder: ReminderObj) => void;
  updateAddReminder: (formValues: FormValues) => void;
  onClose: () => void;
}

const AddReminder = (props: Props) => {
  const {
    classes,
    isOpen,
    onClose,
    updateAddReminder,
    formValues,
    createReminder
  } = props;

  // Use computed properties to use one handler for all updates
  // Inputs must be named to match their correspending key on state
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Enforce 30 character limit
    const title = event.target.value.slice(0, 30);
    updateAddReminder({ title });
  };

  const handleDatetimeChange = datetime => {
    updateAddReminder({ datetime });
  };

  const handleColorChange = ({ hex }) => {
    updateAddReminder({ color: hex });
  };

  const handleCreate = () => {
    createReminder(formValues as ReminderObj);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item className={classes.gridItem}>
            <TextField
              id="title"
              label="Add a Title"
              name="title"
              helperText="30 characters max!"
              fullWidth
              placeholder="Do the dishes"
              onChange={handleTitleChange}
              value={formValues.title}
            />
            <InlineDateTimePicker
              label="Date and Time"
              name="datetime"
              onChange={handleDatetimeChange}
              value={formValues.datetime}
              clearable
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CirclePicker
              color={formValues.color}
              onChangeComplete={handleColorChange}
            />
          </Grid>
        </Grid>
        {/* Remove typography to prevent DOM descendant errors */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
