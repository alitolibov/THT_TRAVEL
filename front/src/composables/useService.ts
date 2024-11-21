import ky from 'ky-universal';
import qs from 'qs';
import { PaginatedResponse } from '@/types';

export const $api = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_API_URL || '',
});

export const useService = (service: string) => {
	return {
		find: async <T extends object>(params?: Record<string, any>): Promise<PaginatedResponse<T>> => {
			const queryRes = qs.stringify(params);
			const url = queryRes ? `${service}?${queryRes}` : service;
			return await $api.get(url).json<PaginatedResponse<T>>();
		},
		get: async <T extends object>(id: string | number): Promise<T> => {
			return await $api.get(`${service}/${id}`).json<T>();
		},
		create: async <T extends object>(body: Record<string, any>) => {
			return await $api.post(service, {json: body}).json<T>();
		}
	};
};