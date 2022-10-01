import axiosCreator from "axios";
import { BASE_URL } from "../config";
const axios = axiosCreator.create({
  baseURL: BASE_URL,
});

//TYPES

export class AccountancyUser {
  _id: string = "";
  userName: string = "";
  email: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  authCode: string = "";
  DOB: Date = new Date();
  title: string = "";
  businessName: string = "";
  isAdmin: boolean = false;
}

export class Transaction {
  user: string = "";
  nameOfTransaction: string = "";
  dateOfTransaction: string = "";
  inflowOrOutflow: "Inflow" | "Outflow" = "Inflow";
  type: "Revenue" | "Other Options" = "Revenue";
  fromOrTo: string = "";
  amount: string = "";
}
const API = {
  signUp: async (user: AccountancyUser): Promise<AccountancyUser> => {
    return await (
      await axios.post(`users/signup`, user)
    ).data.user;
  },
  logIn: async (
    username: string,
    password: string
  ): Promise<AccountancyUser> => {
    return await (
      await axios.post(`users/login`, { username, password })
    ).data.user;
  },

  getAllUsers: async (_id: string): Promise<[AccountancyUser]> => {
    return await (
      await axios.post(`users/all`, { _id })
    ).data;
  },
  deleteUser: async (userName: string): Promise<[AccountancyUser]> => {
    return await (
      await axios.post(`users/delete`, { userName })
    ).data;
  },
  addTransaction: async (transaction: Transaction): Promise<Transaction> => {
    return await (
      await axios.post(`transactions/add`, transaction)
    ).data;
  },
  getTransactions: async (user: string): Promise<[Transaction]> => {
    return await (
      await axios.get(`transactions/${user}`)
    ).data;
  },
  deleteTransaction: async (_id: string): Promise<any> => {
    return await (
      await axios.post(`transactions/delete/${_id}`)
    ).data;
  },
};

export default API;
