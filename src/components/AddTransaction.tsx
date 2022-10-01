import useTransactionForm from "../hooks/useTransactionForm";
import {
  Button as MUIButton,
  Box,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
  useMediaQuery,
  useTheme,
  Autocomplete,
} from "@mui/material";
import { DateRange } from "@mui/icons-material";
import { RoundedButton } from "../theme/styledComponents";

function AddTransaction() {
  const {
    handleChangeAutoComplete,
    handleChange,
    handleFormSubmit,
    values,
    submitErrorMessage,
    submitSuccess,
  } = useTransactionForm();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > :not(style)": { m: 1 },
      }}
      flex={isSmallScreen ? 1 : 0.5}
    >
      <Typography className="blueHeading" variant="h5">
        Add A Transaction
      </Typography>

      <FormControl>
        <Stack spacing={3}>
          <TextField
            id="nameOfTransaction"
            value={values.nameOfTransaction}
            onChange={handleChange("nameOfTransaction")}
            label="Name Of Transaction"
            type="text"
            variant="outlined"
          />
          <TextField
            id="dateOfTransaction"
            placeholder="date"
            value={values.dateOfTransaction}
            onChange={handleChange("dateOfTransaction")}
            label="Date Of Transaction"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRange />
                </InputAdornment>
              ),
            }}
            type="date"
            variant="outlined"
          />
          <Autocomplete
            disablePortal
            options={["Inflow", "Outflow"]}
            value={values.inflowOrOutflow}
            onInputChange={handleChangeAutoComplete("inflowOrOutflow")}
            renderInput={(params) => (
              <TextField {...params} label="Inflow Or Outflow" />
            )}
          />

          <Autocomplete
            disablePortal
            options={["Revenue", "Other Options"]}
            value={values.type}
            onInputChange={handleChangeAutoComplete("type")}
            id="type"
            renderInput={(params) => (
              <TextField {...params} label="Type Of Transaction" />
            )}
          />

          <TextField
            id="fromOrTo"
            value={values.fromOrTo}
            onChange={handleChange("fromOrTo")}
            label="From / To"
            type="text"
          />
          <TextField
            id="amount"
            value={values.amount}
            onChange={handleChange("amount")}
            label="Amount"
            type="number"
            variant="outlined"
          />
          <RoundedButton color="primary" onClick={handleFormSubmit}>
            Add Transaction
          </RoundedButton>
        </Stack>
        <FormHelperText error>{submitErrorMessage}</FormHelperText>
        <FormHelperText>{submitSuccess}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default AddTransaction;
