import * as React from "react";
import { Typography } from "@mui/material";

//component for displaying time in header component
export default function Time() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Typography lineHeight="100%" paddingTop="2vh">
      {time}
    </Typography>
  );
}
