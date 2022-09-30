import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { RoundedButton } from "../theme/styledComponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function OTP() {
  const navigator = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  return (
    <Box width="50%" margin="auto" padding={0.5}>
      <Typography variant="h4">ENTER OTP</Typography>
      <FormControl>
        <TextField
          fullWidth
          label="Verification Code"
          variant="outlined"
          value={authCode}
          onChange={(event) => setAuthCode(event.target.value)}
        />
        <FormHelperText error>{error}</FormHelperText>
      </FormControl>
      <RoundedButton
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
    </Box>
  );
}

export default OTP;
<div>OTP</div>;
