import { useMutation, useQuery } from '@tanstack/vue-query';
import ky, { HTTPError } from 'ky';
import qs from 'qs';

import { PaginatedResponse } from '~/types';
import { queryClient } from '~/utils';


export const $api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = JSON.parse(localStorage.getItem('token')!);

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            (_, __, response) => {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    useRouter().push('/');
                }
            }
        ],
        beforeError: [
            async (error: HTTPError): Promise<any> => {
                return await error.response.json();
            }
        ]
    }
});

export function useService (service: string, queryKey: string) {
    return {
        find: async <T extends object>(params?: Record<string, any>): Promise<PaginatedResponse<T>> => {
            const queryRes = qs.stringify(params);
            const url = queryRes ? `${service}?${queryRes}` : service;
            return await $api.get(url).json<PaginatedResponse<T>>();
        },
        get: <T extends object>(id?: number | string) => {
            return useQuery({
                queryKey: [queryKey, id?.toString()],
                queryFn: async (): Promise<T> => await $api.get(`${service}${id ? `/${id}` : ''}`).json<T>(),
                enabled: false,
            });
        },
        create: <T extends object>() => {
            return useMutation({
                mutationFn: async (data: Record<string, any>): Promise<T>  => await $api.post(service, { json: data }).json<T>(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        },
        update: <T extends object>(id?: number | string) => {
            return useMutation({
                mutationFn: async (data: Record<string, any>):Promise<T> => await $api.patch(`${service}${id ? `/${id}` : ''}`, { json: data }).json<T>(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        },
        remove: <T extends object> () => {
            return useMutation({
                mutationFn: async (id: number | string):Promise<T> => await $api.delete(`${service}/${id}`).json<T>(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        }
    };
}
