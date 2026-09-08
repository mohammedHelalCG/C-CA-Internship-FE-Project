export interface DailyMenuItemRequest {
	mealId: number;
	quantityAvailable: number;
}

export interface CreateDailyMenuRequest {
	menuDate: string;
	publishedBy: string;
	published: boolean;
	items: DailyMenuItemRequest[];
}

export interface DailyMenuResponse extends CreateDailyMenuRequest {
	id: number;
}
