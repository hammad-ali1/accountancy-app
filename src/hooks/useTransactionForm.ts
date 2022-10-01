import API, { Transaction } from "../api/auth";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";

function useTransactionForm() {
  const user = useAppSelector((state) => selectUser(state));
  const [values, setValues] = useState<Transaction>({
    user: user._id,
    nameOfTransaction: "",
    dateOfTransaction: "",
    inflowOrOutflow: "Inflow",
    type: "Revenue",
    fromOrTo: "",
    amount: "",
  });
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleChange =
    (prop: keyof Transaction) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(values);

      setValues({ ...values, [prop]: event.target.value });
    };
  const handleChangeAutoComplete =
    (prop: keyof Transaction) => (event: any, value: string) => {
      console.log(values);
      setValues({ ...values, [prop]: value });
    };

  const handleFormSubmit = async () => {
    if (!user._id) {
      setSubmitSuccess("");
      return setSubmitErrorMessage("you are not logged in");
    }
    if (
      Object.values(values).some((value) => {
        if (!value) {
          return true;
        }

        return false;
      })
    ) {
      setSubmitSuccess("");
      return setSubmitErrorMessage("Please fill all fields");
    }

    try {
      setSubmitErrorMessage("");
      setSubmitSuccess("Transaction added");
      const valuesWithUserId: Transaction = structuredClone(values);
      valuesWithUserId.user = user._id;
      console.log(valuesWithUserId);
      const result = await API.addTransaction(valuesWithUserId);
      console.log(result);
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
  };
}

export default useTransactionForm;
