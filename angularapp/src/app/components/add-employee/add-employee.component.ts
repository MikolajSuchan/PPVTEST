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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addEmployee, getEmployee, updateEmployee } from '../../store/employee/employee.Action';
import { selectEmployee } from '../../store/employee/employee.Selector';



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
  isEdit = false;

  // constructor(private service: EmployeeService, private ref: MatDialogRef<AddEmployeeComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  // }

  constructor(private store: Store, private ref: MatDialogRef<AddEmployeeComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.dialogdata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this.store.dispatch(getEmployee({ emptyId: this.dialogdata.code }));
      this.store.select(selectEmployee).subscribe(item => {
        let _data = item;
        if (_data != null) {
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
    id: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
    email: new FormControl('', [Validators.required,Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{9,15}$')]),
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
      if (!this.isEdit) {
        // this.service.Update(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Updated');
        //   this.closepopup();
        // });
        this.store.dispatch(addEmployee({ data: _data }));
      } else {
        // this.service.Create(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Created');
        //   this.closepopup();
        // });
        this.store.dispatch(updateEmployee({ data: _data }));
      }
      this.closepopup();

    }
  }

  closepopup() {
    this.ref.close();
  }

}