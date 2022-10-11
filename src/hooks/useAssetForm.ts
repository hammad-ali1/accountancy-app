import API, { Asset } from "../api/auth";
import { useEffect, useState } from "react";
import { doesObjContainEmptyFields } from "../helpers";
function useTransactionForm(initialData: Asset) {
  const [values, setValues] = useState<Asset>(initialData);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

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
      setSubmitSuccess("");
      return setSubmitErrorMessage("Please fill all fields");
    }

    try {
      setSubmitErrorMessage("");
      setSubmitSuccess("Asset added");

      const result = await API.addAsset(values);
    } catch (err) {
      console.log(err);
      setSubmitSuccess("");

      setSubmitErrorMessage("error occurred");
    }
  };

  return {
    handleChange,
    handleFormSubmit,
    values,
    submitErrorMessage,
    submitSuccess,
    handleChangeAutoComplete,
    setValues,
  };
}

export default useTransactionForm;
