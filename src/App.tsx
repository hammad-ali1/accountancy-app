import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./GlobalClasses.css";
//Screens
import Authentication from "./screens/Authentication";
import OTP from "./screens/OTP";
import Home from "./screens/Home";
//Redux
import { useAppDispatch } from "./app/hooks";

//MuiTheme
import theme from "./theme/muitheme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
