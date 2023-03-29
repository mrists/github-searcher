import { IRepository } from "../../types/types";

export interface RepositoriesListProps {
  repositories: IRepository[],
  error: string,
  isRepositoriesLoading: boolean,
}