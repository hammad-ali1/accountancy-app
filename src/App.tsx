import { Routes, Route } from "react-router-dom";
import "./GlobalClasses.css";
//Screens
import Authentication from "./screens/Authentication";
import OTP from "./screens/OTP";
import Home from "./screens/Home";
//MuiTheme
import theme from "./theme/muitheme";
import { ThemeProvider, CssBaseline } from "@mui/material";

//Main entry point of the App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
