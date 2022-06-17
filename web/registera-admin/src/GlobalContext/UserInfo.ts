import { createContext } from "preact";
import { useContext } from "preact/hooks";

export type UserInfo = {
  id: string;
  name: string;
  email: string;
};
export type GlobalContextType = {
  userInfo: UserInfo;
  updateInfo?: (UserInfo: UserInfo) => void;
};
const initalState: UserInfo = {
  id: "",
  name: "",
  email: "",
};
export const UserContext = createContext<GlobalContextType>({
  userInfo: initalState,
  updateInfo: (_) => console.warn("No value provided"),
});
export const useInfo = () => useContext(UserContext);
