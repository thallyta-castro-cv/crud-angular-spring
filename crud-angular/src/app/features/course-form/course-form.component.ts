import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

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

  public form = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    category: ['', Validators.required]
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

  save(): void {
    if (this.courseId) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {
    this.loading = true;

    this.coursesService.create(this.form.value).pipe(
      takeUntil(this.unsubscribeNotifier),
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.snackBarService.success('Curso salvo com sucesso!');
        this.location.back();
      },
      error: () => {
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
      next: () => {
        this.snackBarService.success('Curso atualizado com sucesso!');
        this.location.back();
      },
      error: () => {
        this.snackBarService.error('Erro ao atualizar curso!')
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }

}
