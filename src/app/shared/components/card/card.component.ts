import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Tags } from '../../interfaces/tags.interface';


@Component({
    selector:'app-card',
    imports:[CardModule, TagModule , ButtonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class Card {
    @Input() image?: string = '';
    @Input() title: string = '';
    @Input() description : string = '';
    @Input() tags:Tags[] = [];

    @Output() viewDetailsBtn: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() removeFromMenuBtn: EventEmitter<boolean> = new EventEmitter<boolean>(false);

}
