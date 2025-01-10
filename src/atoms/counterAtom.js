import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 키
  default: 0, // 초기값
});
export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});
