import useAssetForm from "../hooks/useAssetForm";
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
import { DateRange } from "@mui/icons-material";
import { RoundedButton } from "../theme/styledComponents";
import { Asset } from "../api/auth";
import { yyyyMMddFormat } from "../helpers";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import CustomizedSnackbars from "./Snackbar";

type AddAssetProps = {
  submitHandler?: () => void;
  initialData?: Asset;
};

//Asset form component
function AddAsset(props: AddAssetProps) {
  const initialAsset = new Asset();
  const user = useAppSelector((state) => selectUser(state));
  initialAsset.user = user._id;
  const {
    handleChangeAutoComplete,
    handleChange,
    handleFormSubmit,
    values,
    submitErrorMessage,
    errorSnackMessage,
    sucessSnackMessage,
    setOpenErrorSnack,
    openErrorSnack,
    openSuccessSnack,
    setOpenSuccessSnack,
    setValues,
  } = useAssetForm(initialAsset);
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
          Add an asset
        </Typography>
      )}

      <FormControl>
        <Stack spacing={3}>
          <TextField
            value={values.item}
            onChange={handleChange("item")}
            label="Item"
            type="text"
            variant="outlined"
          />
          <TextField
            value={values.category}
            onChange={handleChange("category")}
            label="Category"
            type="text"
            variant="outlined"
          />
          <TextField
            value={values.condition}
            onChange={handleChange("condition")}
            label="Condition"
            type="text"
            variant="outlined"
          />

          <TextField
            value={yyyyMMddFormat(values.acquiredDate)}
            onChange={handleChange("acquiredDate")}
            label="Acquired Date"
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
          <TextField
            value={values.price}
            onChange={handleChange("price")}
            label="Price"
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: <div style={{ marginRight: "5px" }}>??</div>,
            }}
          />

          <TextField
            value={values.manufacturer}
            onChange={handleChange("manufacturer")}
            label="Manufacturer"
            type="text"
            variant="outlined"
          />

          <Autocomplete
            disablePortal
            options={["yes", "no"]}
            value={values.inurance}
            onInputChange={handleChangeAutoComplete("inurance")}
            renderInput={(params) => (
              <TextField {...params} label="Insurance" />
            )}
          />
          <RoundedButton
            color="primary"
            onClick={
              props.submitHandler ? props.submitHandler : handleFormSubmit
            }
          >
            Add Asset
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

export default AddAsset;
