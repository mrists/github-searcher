import { useMemo } from "react";
import { IRepository } from "../types/types";

export function useRepos(repositories: IRepository[], query: string): IRepository[] {
  const searchedRepositories = useMemo(() => {
    return repositories.filter((repository: IRepository) =>
      repository.name.toLowerCase().includes(query.toLowerCase()))
  }, [repositories, query]);

  return searchedRepositories;
}