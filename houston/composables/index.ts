import {EventBus} from '~/utils/bus';

export const bus = new EventBus();

export function useLoggedIn(): boolean {
    try {
        useToken();
        return true;
    } catch (e) {
        return false;
    }
}

export function useToken(): string {
    const token: string | null = localStorage.getItem('token');
    if (!token)
        throw new Error('Not authenticated');
    const {exp} = parseJwt(token);
    if (exp < Date.now() / 1000) {
        throw new Error('Not authenticated');
    }
    return token;
}