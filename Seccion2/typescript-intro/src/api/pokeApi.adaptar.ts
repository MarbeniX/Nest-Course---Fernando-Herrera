import axios from "axios";

export interface PokeApiAdapter {
    get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements PokeApiAdapter {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        const data: T = await response.json();
        return data;
    }
}

export class PokeApiAxiosAdapter implements PokeApiAdapter {
    private readonly axios = axios;

    async get<T>(url: string): Promise<T> {
        const { data } = await this.axios.get<T>(url);
        return data;
    }

    async post(url: string, payload: any) {}
    async patch(url: string, payload: any) {}
    async delete(url: string) {}
}
