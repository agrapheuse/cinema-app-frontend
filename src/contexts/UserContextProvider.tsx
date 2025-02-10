"use client";

import type { JSX, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import { User } from "@/types/User";
import UserContext from "./UserContext";

interface WithChildren {
  children: ReactNode;
}

function UserContextProvider({ children }: WithChildren): JSX.Element {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
