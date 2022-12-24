import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
function Header({ link }: { link: string }) {
  const navigator = useNavigate();
  return (
    <Box
      display="flex"
      width="100vw"
      height="6vh"
      boxShadow={2}
      sx={{ backgroundColor: grey[300] }}
      marginBottom={1}
    >
      <IconButton onClick={() => navigator(link, { replace: true })}>
        <ArrowBackIcon />
        <Typography>Back</Typography>
      </IconButton>
    </Box>
  );
}

export default Header;
