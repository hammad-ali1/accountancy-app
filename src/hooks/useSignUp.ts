import API, { AccountancyUser } from "../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

class FormFields extends AccountancyUser {
  showPassword: boolean = false;
  confirmPassword: string = "";
}
//custom hook for signup functonality

function useSignUp() {
  const [values, setValues] = useState(new FormFields());
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [sucessSnackMessage, setSuccessSnackMessage] = useState("");

  const handleChange = (prop: keyof FormFields) => {
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
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleFormSubmit = async () => {
    if (values.password !== values.confirmPassword)
      return setSubmitErrorMessage("password does not match");
    if (
      !(
        values.DOB &&
        values.businessName &&
        values.confirmPassword &&
        values.email &&
        values.userName &&
        values.title &&
        values.password &&
        values.firstName &&
        values.lastName
      )
    )
      return setSubmitErrorMessage("Please fill all fields");
    try {
      const input = { ...values };
      //@ts-ignore
      delete input._id;
      setIsLoading(true);
      const result = await API.signUp(values);
      console.log(result);
      setIsLoading(false);
      setOpenSuccessSnack(true);
      setSuccessSnackMessage("Account Created Successfully");
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
    handleClickShowPassword,
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

export default useSignUp;
