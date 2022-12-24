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
import useEditUser from "../hooks/useEditUser";
import CustomizedSnackbars from "./Snackbar";
import Loader from "./Loader";
//Redux
import { yyyyMMddFormat } from "../helpers";

import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
function EditUser() {
  const user = useAppSelector((state) => selectUser(state));
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    values,
    handleChange,
    handleFormSubmit,
    submitErrorMessage,
    errorSnackMessage,
    sucessSnackMessage,
    isLoading,
    setOpenErrorSnack,
    openErrorSnack,
    openSuccessSnack,
    setOpenSuccessSnack,
  } = useEditUser(user);

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
        Update Profile
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
              id="password"
              label="Password"
              value={values.password}
              onChange={handleChange("password")}
              variant="standard"
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            {/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            ) ? (
              <FormHelperText>Password is valid</FormHelperText>
            ) : (
              <FormHelperText>
                Password must be at least 8 characters with 1 number, 1
                uppercase letter and 1 special character(@$!%*?&)
              </FormHelperText>
            )}
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
              value={yyyyMMddFormat(values.DOB)}
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
            Update
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

export default EditUser;
