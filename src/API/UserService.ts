import axios from "axios";

export class UserService {
  static async getUsers<T>(login: string): Promise<T | any> {
    const url = `https://api.github.com/search/users?q=${login}`;
    const response = await axios.get<T>(url);

    return response;
  }

  static async getUserByID<T>(id: string): Promise<T | any> {
    const url = `https://api.github.com/user/${id}`;

    const response = await axios.get<T>(url);

    return response;
  }

  static async getRepositories<T>(login: string): Promise<T | any> {
    const url = `https://api.github.com/users/${login}/repos`;

    const response = await axios.get<T>(url);

    return response;
  }
}