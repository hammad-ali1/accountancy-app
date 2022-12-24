import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import MenuItems from "../components/MenuItems";
import Time from "./Time";
import { grey } from "@mui/material/colors";

//header component of home screen
function Header() {
  const user = useAppSelector((state) => selectUser(state));

  return (
    <Box
      display="flex"
      width="100vw"
      height="6vh"
      boxShadow={2}
      sx={{ backgroundColor: grey[300] }}
      marginBottom={1}
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
