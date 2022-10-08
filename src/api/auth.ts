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
  dateOfTransaction: Date = new Date();
  inflowOrOutflow: "Inflow" | "Outflow" = "Inflow";
  type: "Revenue" | "Other Options" = "Revenue";
  fromOrTo: string = "";
  amount: string = "";
}

export class Asset {
  user: string = "";
  item: string = "";
  category: string = "";
  condition: string = "";
  location: string = "";
  owner: string = "";
  acquiredDate: Date = new Date();
  price: number = 0.0;
  currentValue: number = 0.0;
  manufacturer: string = "";
  series: string = "";
  inurance: "yes" | "no" = "yes";
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
  getTransactions: async (user: string): Promise<Transaction[]> => {
    return await (
      await axios.get(`transactions/${user}`)
    ).data;
  },
  deleteTransaction: async (_id: string): Promise<any> => {
    return await (
      await axios.post(`transactions/delete/${_id}`)
    ).data;
  },

  addAsset: async (asset: Asset): Promise<Asset> => {
    return await (
      await axios.post(`assets/add`, asset)
    ).data;
  },
  getAssets: async (user: string): Promise<Asset[]> => {
    return await (
      await axios.get(`assets/${user}`)
    ).data;
  },
  deleteAsset: async (_id: string): Promise<any> => {
    return await (
      await axios.post(`assets/delete/${_id}`)
    ).data;
  },
};

export default API;
