import axios, { AxiosInstance, AxiosResponse } from "axios";

type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export class ApiClient {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = "https://mulji-planner.vercel.app/api";
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  async GET<T>({
    path,
    params,
  }: {
    path: string;
    params: object;
  }): Promise<T | ApiResponse> {
    try {
      const res: AxiosResponse<T> = await this.instance.get(path, { params });
      return res.data;
    } catch (e) {
      console.error(e);
      return {
        status: "error",
        message: String(e),
      };
    }
  }

  async POST<T>({
    path,
    data,
  }: {
    path: string;
    data: T;
  }): Promise<ApiResponse> {
    try {
      await this.instance.post(path, data);
      return {
        status: "success",
        message: `${path} POST 성공`,
      };
    } catch (e) {
      console.error(e);
      return {
        status: "error",
        message: String(e),
      };
    }
  }
}
