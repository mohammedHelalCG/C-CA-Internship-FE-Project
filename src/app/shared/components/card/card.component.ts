import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Tags } from '../../interfaces/tags.interface';

@Component({
  selector: 'app-card',
  imports: [CardModule, TagModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class Card {
  @Input() mealId?: number;
  @Input() image?: string;
  @Input() name?: string;
  @Input() description?: string;
  @Input() tags: Tags[] = [];

  @Output() viewDetailsBtn: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeFromMenuBtn: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  viewDetails() {
    this.viewDetailsBtn.emit(this.mealId);
  }
}
