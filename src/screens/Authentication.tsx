import { Stack, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import TabView from "../components/TabView";
import SignUpImage from "../assets/signup.jpg";

//Login and SignUp Screen
function Authentication() {
  return (
    <Stack direction="row" padding="10px">
      <Box flex={0.5}>
        <img
          src={SignUpImage}
          alt="login"
          width="100%"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box flex={0.5}>
        <TabView
          tabs={["LogIn", "SignUp"]}
          panels={[<LoginForm />, <SignUpForm />]}
        />
      </Box>
    </Stack>
  );
}

export default Authentication;
