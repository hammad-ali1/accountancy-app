import useTransactionForm from "../hooks/useTransactionForm";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  FormHelperText,
  useMediaQuery,
  useTheme,
  Autocomplete,
} from "@mui/material";
import CustomizedSnackbars from "./Snackbar";
import { DateRange } from "@mui/icons-material";
import { RoundedButton } from "../theme/styledComponents";
import { Transaction } from "../api/auth";
import { yyyyMMddFormat } from "../helpers";
type AddTransactionProps = {
  submitHandler?: () => void;
  initialData?: Transaction;
};
//Transaction form component

function AddTransaction(props: AddTransactionProps) {
  const {
    handleChangeAutoComplete,
    handleChange,
    handleFormSubmit,
    values,
    submitErrorMessage,
    sucessSnackMessage,
    setOpenErrorSnack,
    openErrorSnack,
    openSuccessSnack,
    setOpenSuccessSnack,
    errorSnackMessage,
    setValues,
  } = useTransactionForm(new Transaction());
  useEffect(() => {
    if (props.initialData) setValues(props.initialData);
  }, [props.initialData, setValues]);
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
      {!props.submitHandler && (
        <Typography className="blueHeading" variant="h5">
          Add a transaction
        </Typography>
      )}

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
            value={yyyyMMddFormat(values.dateOfTransaction)}
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

          <TextField
            value={values.type}
            onChange={handleChange("type")}
            label="Type Of Transaction"
            type="text"
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
            InputProps={{
              startAdornment: <div style={{ marginRight: "5px" }}>£</div>,
            }}
          />
          <RoundedButton
            color="primary"
            onClick={
              props.submitHandler ? props.submitHandler : handleFormSubmit
            }
          >
            Add Transaction
          </RoundedButton>
        </Stack>
        <FormHelperText error>{submitErrorMessage}</FormHelperText>
      </FormControl>

      <CustomizedSnackbars
        isOpen={openErrorSnack}
        text={errorSnackMessage}
        severity="error"
        setIsOpen={setOpenErrorSnack}
      />
      <CustomizedSnackbars
        isOpen={openSuccessSnack}
        text={sucessSnackMessage}
        severity="success"
        setIsOpen={setOpenSuccessSnack}
      />
    </Box>
  );
}

export default AddTransaction;
