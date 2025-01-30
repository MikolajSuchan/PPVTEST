import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { addCompany, getCompany, updateCompany } from '../../store/company/company.Action';
import { selectCompany } from '../../store/company/company.Selector';
import { Company } from '../../models/Company';

@Component({
  selector: 'app-add-company',
  imports: [
      MatCardModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatDatepickerModule,
      MatIconModule,
      MatCheckboxModule,
    ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent implements OnInit{

  title: string = 'Add Company';
  dialogdata: any;
  isEdit = false;

  constructor(private store: Store, private ref: MatDialogRef<AddCompanyComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
  
    }

  ngOnInit(): void {
      this.dialogdata = this.data;
      if (this.dialogdata.code > 0) {
        this.title = 'Edit Company';
        this.isEdit = true;
        this.store.dispatch(getCompany({ companyId: this.dialogdata.code }));
        this.store.select(selectCompany).subscribe(item => {
          let _data = item;
          if (_data != null) {
            this.emptyCompany.setValue({
              id: _data.id,
              name: _data.name,
              industry: _data.industry,
              isActive: _data.isActive,
              hasRemoteWork: _data.hasRemoteWork,

            });
          }
        });
      }
    }

    emptyCompany = new FormGroup({
        id: new FormControl(0, Validators.required),
        name: new FormControl('', Validators.required),
        industry: new FormControl('', Validators.required),
        isActive: new FormControl(false, Validators.required),
        hasRemoteWork: new FormControl(false, Validators.required),
      });


    SaveCompany() {
        if (this.emptyCompany.valid) {
          let _data: Company = {
            id: this.emptyCompany.value.id as number,
            name: this.emptyCompany.value.name as string,
            industry: this.emptyCompany.value.industry as string,
            isActive: this.emptyCompany.value.isActive as unknown as boolean,
            hasRemoteWork: this.emptyCompany.value.hasRemoteWork as unknown as boolean,

          }
          if (!this.isEdit) {

            this.store.dispatch(addCompany({ data: _data }));
          } else {

            this.store.dispatch(updateCompany({ data: _data }));
          }
          this.closepopup();
    
        }
      }

      closepopup() {
        this.ref.close();
      }

}
