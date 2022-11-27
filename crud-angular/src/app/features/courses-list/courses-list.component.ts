import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Course } from '../models/course';
import { CourseList } from '../models/course-list';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() courses: CourseList = {};
  @Output() add = new EventEmitter(false)

  public dataSource: MatTableDataSource<Course>;
  public displayedColumns: string[] = ['name', 'category', 'actions'];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public loading: boolean;

  private unsubscribeNotifier: Subject<void> = new Subject<void>;

  constructor(
    private courseService: FeaturesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  loadCourses(): void {
    this.loading = true;

    this.courseService.getCourses()
      .pipe(
        takeUntil(this.unsubscribeNotifier),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          this.openError("Erro ao carregar cursos!");
        }
      });
  }

  openError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], {relativeTo: this.route})
  }

  onDelete(course: Course) {
    this.courseService.delete(course.id)
      .pipe(
        takeUntil(this.unsubscribeNotifier),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: () => {
          this.snackBarService.success('Curso removido com sucesso!');
          this.loadCourses();
        },
        error: () => {
          this.openError("Erro ao deletar cursos!");
        }
      });
  }

}
