import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { RoundedButton } from "../theme/styledComponents";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PopUpProps = {
  title: string;
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};
export default function PopUp({
  title,
  open,
  children,
  handleClose,
}: PopUpProps) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <RoundedButton
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </RoundedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
