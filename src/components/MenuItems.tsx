import Item from "./Item";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function MenuItems() {
  const user = useAppSelector((state) => selectUser(state));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack spacing={1} divider={<Divider flexItem />}>
          <Item onClick={() => navigate("/home", { replace: true })}>
            Dashboard
          </Item>
          <Item
            onClick={() => navigate("/home/transaction", { replace: true })}
          >
            Transactions
          </Item>
          <Item
            onClick={() => navigate("/home/addTransaction", { replace: true })}
          >
            Add Transaction
          </Item>
          <Item onClick={() => navigate("/home/asset", { replace: true })}>
            Assets
          </Item>
          <Item onClick={() => navigate("/home/addAsset", { replace: true })}>
            Add Asset
          </Item>
          {user && user.isAdmin && (
            <Item onClick={() => navigate("/home/users", { replace: true })}>
              Users
            </Item>
          )}
        </Stack>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(true)}>
        <MenuIcon style={{ color: "black" }} />
      </IconButton>
    </>
  );
}

export default MenuItems;
