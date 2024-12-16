export class EventBus {
	private listeners: {event: string, callback: (data: any) => void}[] = [];
	
	constructor() {};
	
	on(event: string, callback: (data: any) => void) {
		this.listeners.push({event, callback});
	};
	
	emit(event: string, data?: any) {
		this.listeners.forEach(listener => {
			if(listener.event === event) {
				listener.callback(data);
			}
		});
	};
};

export const bus = new EventBus();