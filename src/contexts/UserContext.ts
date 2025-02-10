import React, { createContext } from "react";
import { User } from "@/types/User";

export interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default createContext<IUserContext>({
  user: null,
  setUser: () => {},
});
