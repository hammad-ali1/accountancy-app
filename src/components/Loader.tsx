import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { CircularProgress, Typography, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

//Loading Component
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type LoaderProps = {
  isLoading: boolean;
};
function Loader(props: LoaderProps) {
  return (
    <div>
      <Dialog
        open={props.isLoading}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent sx={{ backgroundColor: "transparent" }}>
          <Box display={"flex"} justifyContent="center">
            <CircularProgress />
          </Box>
          <Typography>Loading...</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Loader;
