import { Button, styled } from "@mui/material";
//Menu Item
const Item = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;

Item.defaultProps = {
  variant: "text",
};
export default Item;
