import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	CreateDailyMenuRequest,
	DailyMenuResponse,
} from './models/daily-menu.model';

@Injectable({
	providedIn: 'root',
})
export class TodaysMenuService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl =
		'https://c-ca-internship-backend-project-production.up.railway.app/';

	createDailyMenu(request: CreateDailyMenuRequest): Observable<DailyMenuResponse> {
		return this.http.post<DailyMenuResponse>(`${this.baseUrl}daily-menus`, request);
	}
}
