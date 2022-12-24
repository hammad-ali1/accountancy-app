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
  IconButton,
  InputAdornment,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import Loader from "./Loader";
import { LockRounded, Visibility, VisibilityOff } from "@mui/icons-material";
function NewPassword() {
  const user = useAppSelector((state) => selectUser(state));

  const navigator = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <BackButton link="/" />
      <Box width="100vw" height="80vh" display="flex" alignContent="center">
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
            NEW PASSWORD
          </Typography>

          <TextField
            label="Password"
            value={password}
            onChange={(event: any) => {
              setPassword(event.target.value);
            }}
            variant="standard"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RoundedButton
            onClick={() => {
              API.updatePassword(user.userName, password).then((user) => {
                navigator("/home", { replace: true });
              });
            }}
          >
            Update Password
          </RoundedButton>
        </Stack>
      </Box>
    </div>
  );
}

export default NewPassword;
