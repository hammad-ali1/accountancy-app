import axiosCreator from "axios";
import { BASE_URL } from "../config";
const axios = axiosCreator.create({
  baseURL: BASE_URL,
});

//TYPES

export class AccountancyUser {
  _id: string = "6337fcde1e2798cc6b20688b";
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
};

export default API;
