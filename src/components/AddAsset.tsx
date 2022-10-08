import useAssetForm from "../hooks/useAssetForm";
import { useEffect } from "react";
import {
  Button as MUIButton,
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
type AddAssetProps = {
  submitHandler?: () => void;
  initialData?: Asset;
};
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
    submitSuccess,
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
          Add An Asset
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
            value={values.location}
            onChange={handleChange("location")}
            label="Location In Business"
            type="text"
            variant="outlined"
          />
          <TextField
            value={values.owner}
            onChange={handleChange("owner")}
            label="Owner"
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
          />

          <TextField
            value={values.currentValue}
            onChange={handleChange("currentValue")}
            label="Current Value"
            type="number"
            variant="outlined"
          />
          <TextField
            value={values.manufacturer}
            onChange={handleChange("manufacturer")}
            label="Manufacturer"
            type="text"
            variant="outlined"
          />
          <TextField
            value={values.series}
            onChange={handleChange("series")}
            label="Series"
            type="text"
            variant="outlined"
          />
          <Autocomplete
            disablePortal
            options={["yes", "no"]}
            value={values.inurance}
            onInputChange={handleChangeAutoComplete("inurance")}
            renderInput={(params) => (
              <TextField {...params} label="Isnurance" />
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
        <FormHelperText>{submitSuccess}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default AddAsset;
