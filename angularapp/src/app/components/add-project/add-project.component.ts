import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { addProject, getProject, updateProject } from '../../store/project/project.Action';
import { selectProject } from '../../store/project/project.Selector';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-add-project',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit{

  title: string = 'Add Project';
  dialogdata: any;
  isEdit = false;

  constructor(private store: Store, private ref: MatDialogRef<AddProjectComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
  
    }

  ngOnInit(): void {
      this.dialogdata = this.data;
      if (this.dialogdata.code > 0) {
        this.title = 'Edit Project';
        this.isEdit = true;
        this.store.dispatch(getProject({ projectId: this.dialogdata.code }));
        this.store.select(selectProject).subscribe(item => {
          let _data = item;
          if (_data != null) {
            this.emptyProject.setValue({
              id: _data.id,
              name: _data.name,
              employee: _data.employee,
          }
        );
      }
    });}
  }

  emptyProject = new FormGroup({
        id: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        employee: new FormControl('', Validators.required),
      });

    SaveProject() {
        if (this.emptyProject.valid) {
          let _data: Project = {
            id: this.emptyProject.value.id as number,
            name: this.emptyProject.value.name as string,
            employee: this.emptyProject.value.employee as string,
          }
          if (!this.isEdit) {
            this.store.dispatch(addProject({ data: _data }));
          } else {
            this.store.dispatch(updateProject({ data: _data }));
          }
          this.closepopup();
    
        }
      }
      closepopup() {
        this.ref.close();
      }



}
