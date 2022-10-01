import MenuItems from "../components/MenuItems";
import { Stack, Box, Divider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Users from "../components/Users";
import Transactions from "../components/Transactions";
import AddTransaction from "../components/AddTransaction";
import Assets from "../components/Assets";
import Header from "../components/Header";
function Home() {
  return (
    <Stack style={{ height: "100vh" }}>
      <Box flex={0.05}>
        <Header />
      </Box>
      <Stack
        flex={0.8}
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
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/addTransaction" element={<AddTransaction />} />
            <Route path="/asset" element={<Assets />} />
          </Routes>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Home;
