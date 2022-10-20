import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { RoundedButton } from "../theme/styledComponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, grey } from "@mui/material/colors";

//OTP screen
function OTP() {
  const navigator = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  return (
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
          ENTER OTP
        </Typography>
        <Box
          color={green[500]}
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <CheckCircleIcon fontSize="large" />
        </Box>
        <FormControl>
          <TextField
            fullWidth
            label="Verification Code"
            variant="standard"
            value={authCode}
            onChange={(event) => setAuthCode(event.target.value)}
          />
          <FormHelperText error>{error}</FormHelperText>
        </FormControl>
        <RoundedButton
          color="success"
          onClick={() => {
            if (authCode === user.authCode) {
              navigator("/home", { replace: true });
            } else {
              setError("Invalid OTP");
            }
          }}
        >
          Verify
        </RoundedButton>
      </Stack>
    </Box>
  );
}

export default OTP;
<div>OTP</div>;
