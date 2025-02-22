import axios from "axios";
import { User } from "@/types/User";

export const getUser = async ({ email }: { email: string }): Promise<User> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = `/api/users/byEmail/${email}`;
  const user = await axios.get<User>(url);
  return user.data;
};
