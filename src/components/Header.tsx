import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
function Header() {
  const user = useAppSelector((state) => selectUser(state));

  return (
    <Box width="100vw" sx={{ backgroundColor: "lightblue" }} height="100%">
      <Typography
        variant="h6"
        fontWeight={400}
        color="black"
        textAlign="center"
      >{`Logged in as: ${user.isAdmin ? "admin" : "user"}`}</Typography>
    </Box>
  );
}

export default Header;
