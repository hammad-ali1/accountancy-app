import API from "../api/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
type Values = {
  username: string;
  password: string;
  showPassword: boolean;
};
function useLogin() {
  const navigator = useNavigate();
  const [values, setValues] = useState<Values>({
    username: "",
    password: "",
    showPassword: false,
  });
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleChange =
    (prop: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleFormSubmit = async () => {
    console.log("Loggin in", values);
    if (values.username && values.password) {
      try {
        const result = await API.logIn(values.username, values.password);
        console.log(result);
        dispatch(setUser(result));
        navigator("/OTP", { replace: true });
      } catch (err) {
        console.log(err);
        setSubmitErrorMessage("username or password is wrong");
      }
    } else {
      setSubmitErrorMessage("Please fill all fields");
    }
  };

  return {
    handleChange,
    handleFormSubmit,
    handleClickShowPassword,
    values,
    submitErrorMessage,
  };
}

export default useLogin;
