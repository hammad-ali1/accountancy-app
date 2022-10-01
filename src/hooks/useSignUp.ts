import API, { AccountancyUser } from "../api/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

class FormFields extends AccountancyUser {
  showPassword: boolean = false;
  confirmPassword: string = "";
}
function useSignUp() {
  const navigator = useNavigate();
  const [values, setValues] = useState(new FormFields());
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const dispatch = useAppDispatch();

  const handleChange =
    (prop: keyof FormFields) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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
      Object.values(values).some((value) => {
        if (!value) return false;
        else return true;
      })
    )
      return setSubmitErrorMessage("Please fill all fields");
    try {
      const result = await API.signUp(values);
      console.log(result);
      setSubmitSuccess("Account Created Successfully");
    } catch (err: any) {
      console.log(err);
      setSubmitErrorMessage(err.message);
    }
  };

  return {
    handleChange,
    handleFormSubmit,
    handleClickShowPassword,
    values,
    submitErrorMessage,
    submitSuccess,
  };
}

export default useSignUp;
