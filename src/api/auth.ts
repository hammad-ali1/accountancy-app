import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: "https://cuireview.herokuapp.com/api/accountancy/",
});

//TYPES

export class AccountancyUser {
  userName: string = "";
  email: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  authCode: string = "";
  DOB: Date = new Date();
  title: string = "";
  businessName: string = "";
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
};

export default API;
