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
