import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Course } from '../models/course';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { FeaturesService } from './../services/features.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form = this.formBuilder.group({
    id: [''],
    name: [''],
    category: ['']
  });

  public loading: boolean;
  public courseId: number = parseInt(this.route.snapshot.paramMap.get('id'));

  private unsubscribeNotifier = new Subject<void>;


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private coursesService: FeaturesService,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
   this.onPopulateForm();
  }

  ngOndestroy(): void {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  onPopulateForm(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category
    });
  }

  create(): void {
    this.loading = true;

    this.coursesService.create(this.form.value).pipe(
      takeUntil(this.unsubscribeNotifier),
      finalize(() => this.loading = false)
    ).subscribe({
      next: course => {
        this.snackBarService.success('Curso salvo com sucesso!');
        this.location.back();
      },
      error: error => {
        this.snackBarService.error('Erro ao salvar curso!')
      }
    });
  }

  update(): void {
    this.loading = true;

    this.coursesService.update(this.form.value).pipe(
      takeUntil(this.unsubscribeNotifier),
      finalize(() => this.loading = false)
    ).subscribe({
      next: course => {
        this.snackBarService.success('Curso atualizado com sucesso!');
        this.location.back();
      },
      error: error => {
        this.snackBarService.error('Erro ao atualizar curso!')
      }
    });
  }

  save(): void {
    if (this.courseId) {
      this.update();
    } else {
      this.create();
    }
  }

  onCancel(): void {
    this.location.back();
  }

}
