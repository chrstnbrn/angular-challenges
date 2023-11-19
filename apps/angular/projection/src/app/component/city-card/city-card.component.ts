import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    *ngIf="cities$ | async as cities"
    [items]="cities"
    imageUrl="assets/svg/city.svg"
    class="bg-light-green"
    (add)="addCity()"
    (delete)="delete($event)">
    <ng-template #itemTemplate let-item>
      {{ item.name }}
    </ng-template>
  </app-card>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, NgIf],
  styles: `
    :host {
      --card-background-color: #{rgba(0, 0, 250, 0.1)};
    }
  `,
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit() {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  delete(city: City) {
    this.store.deleteOne(city.id);
  }
}
