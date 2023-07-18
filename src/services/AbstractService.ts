import { api as AxiosApi } from "./api";

export abstract class AbstractService<T> {
    protected abstract route: string;

    protected api = AxiosApi;

    public async get(id: number): Promise<T> {
        const { data } = await this.api.get<T>(`${this.route}/${id}`, {});
        return data;
    }

    public async list(params?: any): Promise<Array<T>> {
        const { data } = await this.api.get<Array<T>>(`${this.route}/`, { params });
        return [];
    }

    public async create(createData: T): Promise<T> {
        const { data } = await this.api.post<T>(`${this.route}/`, createData);
        return data;
    }

    public async update(id: number, updateData: T): Promise<T> {
        const { data } = await this.api.put<T>(`${this.route}/${id}`, updateData);
        return data;
    }

    public async delete(id: number): Promise<void> {
        await this.api.delete<T>(`${this.route}/${id}`, {});
    }
}
