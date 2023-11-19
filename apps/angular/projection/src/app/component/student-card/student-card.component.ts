import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    *ngIf="students$ | async as students"
    [items]="students"
    imageUrl="assets/img/student.webp"
    (add)="addStudent()"
    (delete)="delete($event)">
    <ng-template #itemTemplate let-student>
      {{ student.firstname }}
    </ng-template>
  </app-card>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      --card-background-color: #{rgba(0, 250, 0, 0.1)};
    }
  `,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class StudentCardComponent implements OnInit {
  students$ = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit() {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  delete(student: Student) {
    this.store.deleteOne(student.id);
  }
}
