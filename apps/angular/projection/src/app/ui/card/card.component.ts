import { NgForOf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent, NgForOf, NgTemplateOutlet],
  styles: `
    :host {
      background-color: var(--card-background-color)
    }
  `,
})
export class CardComponent<T> {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) items!: T[];

  @ContentChild('itemTemplate')
  itemTemplate!: TemplateRef<{ $implicit: T }>;

  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<T>();

  @HostBinding() class =
    'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3';
}
