import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/Employee';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../store/employee.action';
import { getEmptyList } from '../../store/employee.Selector';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,


  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,OnDestroy {

  emptyList: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'city', 'country', 'date', 'action']
  subscription = new Subscription();

  // constructor(private dialog:MatDialog,private service:EmployeeService) { 
    
  // }

  constructor(private dialog:MatDialog,private store: Store,
  ) { 
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.GetAllEmployee();
  }

  GetAllEmployee(){
  //   let sub= this.service.GetAll().subscribe(item=>{
  //     this.emptyList = item;
  //     this.dataSource=new MatTableDataSource(this.emptyList);
  //   }
  // )
  // this.subscription.add(sub);
  this.store.dispatch(loadEmployee());
  this.store.select(getEmptyList).subscribe(item=>{
    this.emptyList = item;
    this.dataSource=new MatTableDataSource(this.emptyList);
  })
}

  addEmployee(){
    this.openpopup(0);
  }

  EditEmployee(emptyId:number){
    this.openpopup(emptyId);
  }


  DeleteEmployee(emptyId:number){
    if(confirm('Are you sure you want to delete this record?')){
      // let sub = this.service.Delete(emptyId).subscribe(item=>{
      //   this.GetAllEmployee();
      // });
      // this.subscription.add(sub);
      this.store.dispatch(deleteEmployee({ emptyId: emptyId }));
    }
  }

  openpopup(emptyId: number) {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '750ms',
      enterAnimationDuration: '750ms',
      data: {
        'code': emptyId
      }
    }).afterClosed().subscribe(item => {
      this.GetAllEmployee();
    });
  }


}
