import { styled, Button } from "@mui/material";
//customized submit button
export const RoundedButton = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;
RoundedButton.defaultProps = {
  variant: "contained",
  color: "primary",
};
