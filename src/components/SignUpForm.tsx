import {
  Button as MUIButton,
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
  MailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
  AccountCircle,
  Business,
  DateRange,
} from "@mui/icons-material";
import { RoundedButton } from "../theme/styledComponents";
import useSignUp from "../hooks/useSignUp";
import CustomizedSnackbars from "./Snackbar";
import Loader from "./Loader";
//Redux
import { useAppDispatch } from "../app/hooks";
//Hooks
export default function SignUpForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    values,
    handleChange,
    handleClickShowPassword,
    handleFormSubmit,
    submitErrorMessage,
    errorSnackMessage,
    sucessSnackMessage,
    isLoading,
    setOpenErrorSnack,
    openErrorSnack,
    openSuccessSnack,
    setOpenSuccessSnack,
  } = useSignUp();

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
        Create A New Account
      </Typography>

      <FormControl>
        <Stack spacing={3}>
          <FormControl>
            <TextField
              id="userName"
              value={values.userName}
              onChange={handleChange("userName")}
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

          <FormControl>
            <TextField
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              label="Email"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailRounded />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <TextField
            id="password"
            label="Password"
            value={values.password}
            onChange={handleChange("password")}
            variant="standard"
            type={values.showPassword ? "text" : "password"}
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
          <FormControl>
            <TextField
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              label="Confirm Password"
              type={values.showPassword ? "text" : "password"}
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
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <TextField
              id="businessName"
              label="Business Name"
              value={values.businessName}
              onChange={handleChange("businessName")}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              id="firstName"
              value={values.firstName}
              onChange={handleChange("firstName")}
              label="First Name"
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

          <FormControl>
            <TextField
              id="lastName"
              value={values.lastName}
              onChange={handleChange("lastName")}
              label="Last Name"
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

          <FormControl>
            <TextField
              id="DOB"
              value={values.DOB}
              onChange={handleChange("DOB")}
              label="Date Of Birth"
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              id="title"
              value={values.title}
              onChange={handleChange("title")}
              label="Title"
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
          <RoundedButton color="primary" onClick={handleFormSubmit}>
            Sign Up
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

      <CustomizedSnackbars
        isOpen={openSuccessSnack}
        text={sucessSnackMessage}
        severity="success"
        setIsOpen={setOpenSuccessSnack}
      />
    </Box>
  );
}
