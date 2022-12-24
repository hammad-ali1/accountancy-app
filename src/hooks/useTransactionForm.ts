import API, { Transaction } from "../api/auth";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";

//custom hook for transaction form
//with functionalites of adding and deletig transaction
function useTransactionForm(initialData: Transaction) {
  const user = useAppSelector((state) => selectUser(state));
  const [values, setValues] = useState<Transaction>(initialData);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [sucessSnackMessage, setSuccessSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (prop: keyof Transaction) => {
    if (prop === "amount") {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    } else
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };
  };
  const handleChangeAutoComplete =
    (prop: keyof Transaction) => (event: any, value: string) => {
      setValues({ ...values, [prop]: value });
    };

  const handleFormSubmit = async () => {
    if (!user._id) {
      return setSubmitErrorMessage("you are not logged in");
    }
    if (
      !(
        values.amount &&
        values.dateOfTransaction &&
        values.fromOrTo &&
        values.inflowOrOutflow &&
        values.nameOfTransaction &&
        values.type
      )
    ) {
      console.log(values);
      return setSubmitErrorMessage("Please fill all fields");
    }

    try {
      const valuesWithUserId: Transaction = structuredClone(values);
      valuesWithUserId.user = user._id;
      setSubmitErrorMessage("");
      setIsLoading(true);
      setOpenSuccessSnack(true);
      setSuccessSnackMessage("Transaction Added Successfully");
      const result = await API.addTransaction(valuesWithUserId);
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
