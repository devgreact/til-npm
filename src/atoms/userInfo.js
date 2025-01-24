import { atom } from "recoil";

export const userInfo = atom({
  key: "userinfo",
  default: {
    name: "",
    phone: "",
    birth: "",
    nickName: "",
  },
});

export const loginInfoState = atom({
  key: "loginInfoState",
  default: {
    userId: 0,
    roleId: 0,
    name: "",
    accessToken: "",
    refreshToken: "",
  },
});
