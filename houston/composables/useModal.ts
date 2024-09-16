import {bus} from '~/composables/index';

export function useModal(id: string) {
    return {
        open(data?: any) {
            bus.emit('modals.open', {id, data: data || {}});
        },
        close() {
            bus.emit('modals.close', {id});
        }
    };
}
