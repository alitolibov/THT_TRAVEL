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
	updatedAt: string;
}

export interface ITour {
	id: number
	nameDirectionRu: string;
	nameDirectionUz: string;
	nameDirectionEn: string;
	descriptionRu: string;
	descriptionUz: string;
	descriptionEn: string;
	images: IUpload[];
	imageIds?: number[];
	price: number;
	durationDays: number;
	durationNights?: number | null;
	categoryTour?: ICategoryTour | null;
	categoryId: number | null;
	createdAt: string;
	updatedAt: string;
}

export interface IUpload {
	id: number
	filename: string;
	originalname: string;
	path: string;
	size: number;
	createdAt: string;
	updatedAt: string;
}

export interface ISettings{
	id: number
	aboutUsRu: string;
	aboutUsUz: string;
	aboutUsEn: string;
	yearInTourism: number;
	readyTours: number;
	clients: number;
	sales: number;
	phoneFirst: string;
	phoneSecond?: string;
	instagram: string;
	telegram: string;
	mail: string;
	createdAt: string;
	updatedAt: string;
}


export interface ICategoryTour {
	id: number
	nameRu: string;
	nameUz: string;
	nameEn: string;
	tours: ITour;
	priority: number;
	createdAt: string;
	updatedAt: string;
}

export interface PaginatedResponse<T> {
	data: T[]
	total: number
	skip: number
	limit: number
}