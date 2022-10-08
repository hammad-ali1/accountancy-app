import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import MenuItems from "../components/MenuItems";
import Time from "./Time";
function Header() {
  const user = useAppSelector((state) => selectUser(state));

  return (
    <Box
      display="flex"
      width="100vw"
      height="6vh"
      sx={{ backgroundColor: "lightblue" }}
    >
      <Box>
        <MenuItems />
      </Box>
      <Box flex={1}>
        <Typography
          lineHeight="100%"
          paddingTop="2vh"
          fontWeight={400}
          color="black"
          textAlign="center"
        >{`Logged in as: ${user.isAdmin ? "admin" : "user"}`}</Typography>
      </Box>
      <Box paddingRight={2}>
        <Time />
      </Box>
    </Box>
  );
}

export default Header;
