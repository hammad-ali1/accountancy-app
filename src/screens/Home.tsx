import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Users from "../components/Users";
import Transactions from "../components/Transactions";
import AddTransaction from "../components/AddTransaction";
import Assets from "../components/Assets";
import Header from "../components/Header";
import AddAsset from "../components/AddAsset";
import Dashboard from "../components/Dashboard";
import EditUser from "../components/EditUser";
//Main screen
function Home() {
  return (
    <Box style={{ height: "100vh" }}>
      <Header />

      <Box>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/addTransaction" element={<AddTransaction />} />
          <Route path="/asset" element={<Assets />} />
          <Route path="/addAsset" element={<AddAsset />} />
          <Route path="/editUser" element={<EditUser />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Home;
