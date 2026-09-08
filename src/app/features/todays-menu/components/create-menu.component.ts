import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { catchError, finalize, of } from 'rxjs';
import { Meal } from '../../meals/Interfaces/meal.interface';
import { MealService } from '../../meals/services/meal.service';
import { TodaysMenuService } from '../todays-menu.service';

interface ScheduleDate {
	label: string;
	value: string;
}

@Component({
	selector: 'app-create-menu',
	imports: [ButtonModule, CheckboxModule, FormsModule, InputTextModule, SelectModule],
	templateUrl: './create-menu.component.html',
	styleUrl: './create-menu.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMenuComponent {
	private readonly mealService = inject(MealService);
	private readonly todaysMenuService = inject(TodaysMenuService);

	readonly maxSelectedMeals = 5;
	readonly loading = signal(true);
	readonly submitting = signal(false);
	readonly loadError = signal<string | null>(null);
	readonly submitError = signal<string | null>(null);
	readonly searchTerm = signal('');
	readonly meals = signal<Meal[]>([]);
	readonly selectedMealIds = signal<number[]>([]);
	readonly selectedMeals = computed(() =>
		this.selectedMealIds()
			.map((mealId) => this.meals().find((meal) => meal.id === mealId))
			.filter((meal): meal is Meal => meal !== undefined),
	);
	readonly filteredMeals = computed(() => {
		const searchTerm = this.searchTerm().trim().toLowerCase();

		if (!searchTerm) {
			return this.meals();
		}

		return this.meals().filter((meal) =>
			`${meal.name} ${meal.category}`.toLowerCase().includes(searchTerm),
		);
	});

	readonly scheduleDates: ScheduleDate[] = this.createScheduleDates();
	selectedDate = this.scheduleDates[0].value;

	constructor() {
		this.mealService
			.getAllMeals()
			.pipe(
				catchError(() => {
					this.loadError.set('Unable to load meals.');
					return of([] as Meal[]);
				}),
				finalize(() => this.loading.set(false)),
			)
			.subscribe((meals) => this.meals.set(meals));
	}

	isSelected(meal: Meal): boolean {
		return this.selectedMealIds().includes(meal.id);
	}

	canSelect(meal: Meal): boolean {
		return this.isSelected(meal) || this.selectedMealIds().length < this.maxSelectedMeals;
	}

	onMealSelectionChange(meal: Meal, selected: boolean): void {
		if (selected) {
			if (this.isSelected(meal) || this.selectedMealIds().length >= this.maxSelectedMeals) {
				return;
			}

			this.selectedMealIds.update((currentMealIds) => [...currentMealIds, meal.id]);
			return;
		}

		this.selectedMealIds.update((currentMealIds) =>
			currentMealIds.filter((selectedMealId) => selectedMealId !== meal.id),
		);
	}

	removeSelectedMeal(meal: Meal): void {
		this.onMealSelectionChange(meal, false);
	}

	createMenu(): void {
		if (this.selectedMealIds().length === 0 || this.submitting()) {
			return;
		}

		this.submitting.set(true);
		this.submitError.set(null);
		this.todaysMenuService
			.createDailyMenu({
				menuDate: this.selectedDate,
				publishedBy: 'admin',
				published: true,
				items: this.selectedMealIds().map((mealId) => ({
					mealId,
					quantityAvailable: 0,
				})),
			})
			.pipe(finalize(() => this.submitting.set(false)))
			.subscribe({
				error: () => this.submitError.set('Unable to create the daily menu.'),
			});
	}

	private createScheduleDates(): ScheduleDate[] {
		return Array.from({ length: 6 }, (_, dayOffset) => {
			const date = new Date();
			date.setDate(date.getDate() + dayOffset);

			return {
				label: dayOffset === 0
					? `Today, ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
					: date.toLocaleDateString(undefined, {
							weekday: 'short',
							month: 'short',
							day: 'numeric',
						}),
				value: this.formatDate(date),
			};
		});
	}

	private formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}
}
