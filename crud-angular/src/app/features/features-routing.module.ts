import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../shared/modules/material.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  {
    path:'',
    component: CoursesComponent
  },
  {
    path:'new',
    component: CourseFormComponent,
    resolve: {course: CourseResolver}
  },
  {
    path:'edit/:id',
    component: CourseFormComponent,
    resolve: {course: CourseResolver}
  }
];

@NgModule({
  imports: [
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class FeaturesRoutingModule { }
