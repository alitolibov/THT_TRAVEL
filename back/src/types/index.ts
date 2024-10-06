export interface IJwtPayload {
    id: string;
    email: string;
}

export interface IPaginatedResponse<T> {
    data: T[];
    total: number;
    skip: number;
    limit: number;
}
