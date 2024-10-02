import ky, { HTTPError } from "ky";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryClient } from "~/utils";
import qs from "qs";


export const $api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
    hooks: {
        beforeRequest: [
            (request) => {
                const token = JSON.parse(localStorage.getItem("token")!);

                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            (_, __, response) => {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    useRouter().push("/");
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
        get: async (params: Record<string, any>) => {
            const queryRes = qs.stringify(params)
            const url = queryRes ? `${service}?${queryRes}` : service;
            return await $api.get(url).json();
        },
        create: () => {
            return useMutation({
                mutationFn: async (data: Record<string, any>) => await $api.post(service, { json: data }).json(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        },
        update: () => {
            return useMutation({
                mutationFn: async (data: Record<string, any>) => await $api.patch(service, { json: data }).json(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        },
        remove: () => {
            return useMutation({
                mutationFn: async () => await $api.delete(service).json(),
                onSuccess: () => queryClient.invalidateQueries({
                    queryKey: [queryKey]
                })
            });
        }
    };
};
