export interface IEmployee {
    id: number
    firstName: string;
    lastName: string;
    position: string;
    phone: string;
    instagram: string;
    telegram: string;
    imageId: number;
    image: IUpload;
    createdAt: string;
    updatedAt: string
}

export interface IUpload {
    id: number
    filename: string;
    originalname: string;
    path: string;
    size: number;
    createdAt: string;
    updatedAt: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    skip: number
    limit: number
}