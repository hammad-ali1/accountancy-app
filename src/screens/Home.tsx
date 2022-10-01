import MenuItems from "../components/MenuItems";
import { Stack, Box, Divider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Users from "../components/Users";
function Home() {
  return (
    <Stack
      spacing={1}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Box flex={0.2}>
        <MenuItems />
      </Box>
      <Box flex={0.8}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default Home;
