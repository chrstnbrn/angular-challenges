import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card
    *ngIf="teachers$ | async as teachers"
    [items]="teachers"
    imageUrl="assets/img/teacher.png"
    (add)="addTeacher()"
    (delete)="delete($event)">
    <ng-template #itemTemplate let-teacher>
      {{ teacher.firstname }}
    </ng-template>
  </app-card>`,
  styles: `
    :host {
      --card-background-color: #{rgba(250, 0, 0, 0.1)};
    }
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class TeacherCardComponent implements OnInit {
  teachers$ = this.store.teachers$;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit() {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  delete({ id }: { id: number }) {
    this.store.deleteOne(id);
  }
}
