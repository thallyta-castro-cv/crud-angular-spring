import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses/courses.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FeaturesRoutingModule
  ],
  exports: [
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class FeaturesModule { }
