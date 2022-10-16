import API, { Asset } from "../api/auth";
import { useState } from "react";
import { doesObjContainEmptyFields } from "../helpers";
function useTransactionForm(initialData: Asset) {
  const [values, setValues] = useState<Asset>(initialData);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [sucessSnackMessage, setSuccessSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange =
    (prop: keyof Asset) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleChangeAutoComplete =
    (prop: keyof Asset) => (event: any, value: string) => {
      setValues({ ...values, [prop]: value });
    };

  const handleFormSubmit = async () => {
    if (doesObjContainEmptyFields(values)) {
      console.log(values);
      return setSubmitErrorMessage("Please fill all fields");
    }
    try {
      setSubmitErrorMessage("");
      setIsLoading(true);
      setOpenSuccessSnack(true);
      setSuccessSnackMessage("Asset Added Successfully");

      const result = await API.addAsset(values);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      setErrorSnackMessage(
        err.response.data ? err.response.data.message : err.message
      );
      setOpenErrorSnack(true);
    }
  };

  return {
    handleChange,
    handleFormSubmit,
    values,
    submitErrorMessage,
    errorSnackMessage,
    sucessSnackMessage,
    isLoading,
    setOpenErrorSnack,
    openErrorSnack,
    openSuccessSnack,
    setOpenSuccessSnack,
    handleChangeAutoComplete,
    setValues,
  };
}

export default useTransactionForm;
