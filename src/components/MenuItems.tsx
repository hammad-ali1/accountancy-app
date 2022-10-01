import Item from "./Item";
import { Stack, Divider } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
function MenuItems() {
  const user = useAppSelector((state) => selectUser(state));
  const navigate = useNavigate();
  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <Item onClick={() => navigate("/home", { replace: true })}>
        Dashboard
      </Item>
      <Item onClick={() => navigate("/home/transaction", { replace: true })}>
        Transactions
      </Item>
      <Item onClick={() => navigate("/home/addTransaction", { replace: true })}>
        Add Transaction
      </Item>
      <Item onClick={() => navigate("/home/asset", { replace: true })}>
        Assets
      </Item>
      {user && user.isAdmin && (
        <Item onClick={() => navigate("/home/users", { replace: true })}>
          Users
        </Item>
      )}
    </Stack>
  );
}

export default MenuItems;
