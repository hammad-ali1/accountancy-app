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
//custom hook for logging in
function useLogin() {
  const navigator = useNavigate();
  const [values, setValues] = useState<Values>({
    username: "",
    password: "",
    showPassword: false,
  });
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (values.username && values.password) {
      let result;
      try {
        setIsLoading(true);
        result = await API.logIn(values.username, values.password);
        setIsLoading(false);
        console.log(result);
        dispatch(setUser(result));
        navigator("/OTP/none", { replace: true });
      } catch (err: any) {
        setIsLoading(false);
        console.log(err);
        setErrorSnackMessage(
          err.response.data ? err.response.data.message : err.message
        );
        setOpenErrorSnack(true);
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
    isLoading,
    openErrorSnack,
    errorSnackMessage,
    setOpenErrorSnack,
  };
}

export default useLogin;
