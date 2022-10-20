import BackButton from "./BackButton";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";
import { green, grey } from "@mui/material/colors";
import { RoundedButton } from "../theme/styledComponents";
import API from "../api/auth";
import CustomizedSnackbars from "./Snackbar";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import Loader from "./Loader";

function ResetPassword() {
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  return (
    <div>
      <BackButton link="/" />
      <Box width="100vw" height="100vh" display="flex" alignContent="center">
        <Stack
          width="400px"
          margin="auto"
          gap={1}
          padding={3}
          boxShadow={2}
          borderRadius={1}
          border={0.5}
          borderColor={grey}
        >
          <Typography
            fontSize={32}
            textAlign="center"
            fontFamily="monospace"
            variant="h5"
          >
            RESET PASSWORD
          </Typography>

          <FormControl>
            <TextField
              fullWidth
              label="User ID"
              variant="standard"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </FormControl>
          <RoundedButton
            onClick={() => {
              setLoading(true);
              API.sendResetPasswordMail(userId)
                .then((user) => {
                  setLoading(false);
                  console.log(user);
                  dispatch(setUser(user));
                  navigator("/OTP", { replace: true });
                })
                .catch((err: any) => {
                  setLoading(false);
                  console.log(err);
                  setErrorSnackMessage(
                    err.response.data ? err.response.data.message : err.message
                  );
                  setOpenErrorSnack(true);
                });
            }}
          >
            Send Verification Mail
          </RoundedButton>
        </Stack>
      </Box>
      <Loader isLoading={loading} />
      <CustomizedSnackbars
        isOpen={openErrorSnack}
        text={errorSnackMessage}
        severity="error"
        setIsOpen={setOpenErrorSnack}
      />
    </div>
  );
}

export default ResetPassword;
