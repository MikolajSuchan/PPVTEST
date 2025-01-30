import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Company } from '../../models/Company';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteCompany, loadCompany } from '../../store/company/company.Action';
import { getEmptyCompany } from '../../store/company/company.Selector';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-company',
  imports: [
      MatCardModule,
      MatButtonModule,
      MatDialogModule,
      MatTableModule,
      CommonModule,
      MatCheckboxModule
    ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit,OnDestroy{

  emptyCompany: Company[] = [];
  dataCompany!: MatTableDataSource<Company>;
  displayedColumns: string[] = ['id', 'name','industry','isActive','hasRemoteWork','action']
  subscription = new Subscription();

  constructor(private dialog:MatDialog,private store: Store,
    ) { 
      
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    ngOnInit(): void {
      this.GetAllCompanies();
    }

    GetAllCompanies(){
      this.store.dispatch(loadCompany());
      this.store.select(getEmptyCompany).subscribe(item=>{
        this.emptyCompany = item;
        this.dataCompany=new MatTableDataSource(this.emptyCompany);
      })
    }

    addCompany(){
      this.openpopup(0);
    }

    EditCompany(companyId:number){
      this.openpopup(companyId);
    }

    DeleteCompany(companyId:number){
        if(confirm('Are you sure you want to delete this record?')){

          this.store.dispatch(deleteCompany({ companyId: companyId }));
        }
      }

    openpopup(companyId: number) {
        this.dialog.open(AddCompanyComponent, {
          width: '50%',
          exitAnimationDuration: '750ms',
          enterAnimationDuration: '750ms',
          data: {
            'code': companyId
          }
        }).afterClosed().subscribe(item => {
          this.GetAllCompanies();
        });
      }

}
