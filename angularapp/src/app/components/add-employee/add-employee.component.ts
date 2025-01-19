import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-employee',
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class AddEmployeeComponent implements OnInit {

  title: string = 'Add Employee';
  dialogdata: any;
  isEdit=false;

  constructor(private service: EmployeeService, private ref: MatDialogRef<AddEmployeeComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.dialogdata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit=true;
      this.service.Get(this.dialogdata.code).subscribe(item => {
        let _data = item;
        if(_data!=null){
          this.emptyForm.setValue({
            id: _data.id,
            name: _data.name,
            email: _data.email,
            phone: _data.phone,
            address: _data.address,
            city: _data.city,
            country: _data.country,
            date: _data.date
          });
        }
      });
    }
  }


  emptyForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  SaveEmployee() {
    if (this.emptyForm.valid) {
      let _data: Employee = {
        id: this.emptyForm.value.id as number,
        name: this.emptyForm.value.name as string,
        email: this.emptyForm.value.email as string,
        phone: this.emptyForm.value.phone as string,
        address: this.emptyForm.value.address as string,
        city: this.emptyForm.value.city as string,
        country: this.emptyForm.value.country as string,
        date: new Date(this.emptyForm.value.date as Date),
      }
      if(this.isEdit){
        this.service.Update(_data).subscribe(item => {
          this.toastr.success('Employee updated successfully', 'Updated');
          this.closepopup();});

      }else{
        this.service.Create(_data).subscribe(item => {
          this.toastr.success('Employee added successfully', 'Created');
          this.closepopup();
      });}
    }
  }

  closepopup() {
    this.ref.close();
  }


}