import {
  Box,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { RoundedButton } from "../theme/styledComponents";
import useLogin from "../hooks/useLogin";
import CustomizedSnackbars from "./Snackbar";
import Loader from "./Loader";
//Hooks
export default function LoginForm() {
  const theme = useTheme();
  const {
    values,
    handleFormSubmit,
    handleChange,
    handleClickShowPassword,
    submitErrorMessage,
    isLoading,
    openErrorSnack,
    errorSnackMessage,
    setOpenErrorSnack,
  } = useLogin();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > :not(style)": { m: 1 },
      }}
      flex={isSmallScreen ? 1 : 0.5}
    >
      <Typography className="blueHeading" variant="h5">
        Login To Account
      </Typography>
      <FormControl>
        <Stack spacing={3}>
          <FormControl>
            <TextField
              id="username"
              value={values.username}
              onChange={handleChange("username")}
              label="Username"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <TextField
            id="password"
            type={values.showPassword ? "text" : "password"}
            label="Password"
            value={values.password}
            onChange={handleChange("password")}
            variant="standard"
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RoundedButton color="primary" onClick={handleFormSubmit}>
            Log In
          </RoundedButton>
        </Stack>
        <FormHelperText error>{submitErrorMessage}</FormHelperText>
      </FormControl>
      <Loader isLoading={isLoading} />
      <CustomizedSnackbars
        isOpen={openErrorSnack}
        text={errorSnackMessage}
        severity="error"
        setIsOpen={setOpenErrorSnack}
      />
    </Box>
  );
}
