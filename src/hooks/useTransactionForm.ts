import API, { Transaction } from "../api/auth";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";

function useTransactionForm(initialData: Transaction) {
  const user = useAppSelector((state) => selectUser(state));
  const [values, setValues] = useState<Transaction>(initialData);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleChange =
    (prop: keyof Transaction) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleChangeAutoComplete =
    (prop: keyof Transaction) => (event: any, value: string) => {
      setValues({ ...values, [prop]: value });
    };

  const handleFormSubmit = async () => {
    console.log(values);
    if (!user._id) {
      setSubmitSuccess("");
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
      setSubmitSuccess("");
      return setSubmitErrorMessage("Please fill all fields");
    }

    try {
      setSubmitErrorMessage("");
      setSubmitSuccess("Transaction added");
      const valuesWithUserId: Transaction = structuredClone(values);
      valuesWithUserId.user = user._id;
      const result = await API.addTransaction(valuesWithUserId);
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
