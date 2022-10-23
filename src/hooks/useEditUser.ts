import API, { AccountancyUser } from "../api/auth";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";

function useEditUser(user: AccountancyUser) {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState(user);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [sucessSnackMessage, setSuccessSnackMessage] = useState("");

  const handleChange = (prop: keyof AccountancyUser) => {
    if (prop === "firstName" || prop === "lastName")
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = "";
        if (event.target.value !== "")
          newValue =
            event.target.value[0].toLocaleUpperCase() +
            event.target.value.substring(1);
        setValues({ ...values, [prop]: newValue });
      };
    else
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };
  };

  const handleFormSubmit = async () => {
    if (
      !(
        values.DOB &&
        values.businessName &&
        values.userName &&
        values.title &&
        values.password &&
        values.firstName &&
        values.lastName
      )
    ) {
      console.log(values);
      return setSubmitErrorMessage("Please fill all fields");
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        values.password
      )
    )
      return setSubmitErrorMessage(
        "Password must be at least 8 characters with 1 number, uppercase letter and special character(@$!%*?&)"
      );
    try {
      const input = { ...values };
      //@ts-ignore
      delete input._id;
      setIsLoading(true);
      const result = await API.updateUser(values);
      console.log(result);

      setSubmitErrorMessage("");

      setIsLoading(false);
      dispatch(setUser(values));

      setOpenSuccessSnack(true);
      setSuccessSnackMessage("Profile Updated Successfully");
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
  };
}

export default useEditUser;
