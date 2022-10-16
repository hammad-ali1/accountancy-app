import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackBarProps = {
  text: string;
  severity: AlertColor;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CustomizedSnackbars(props: SnackBarProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setIsOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
