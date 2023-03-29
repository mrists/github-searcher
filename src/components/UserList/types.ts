import { IUser } from "../../types/types";

export interface UserListProps {
  users: IUser[],
  fetched: boolean,
  error: string,
}

