import { atom } from "recoil";

export { errorState };

const errorState = atom({
  key: "errorState",
  default: null,
});
