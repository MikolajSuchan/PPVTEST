import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Project } from '../../models/Project';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteProject, loadProject } from '../../store/project/project.Action';
import { getEmptyProject } from '../../store/project/project.Selector';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-project',
  imports: [
      MatCardModule,
      MatButtonModule,
      MatDialogModule,
      MatTableModule,
      CommonModule,
    ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit,OnDestroy {

  emptyProject: Project[] = [];
  projectSource!: MatTableDataSource<Project>;
  displayedColumns: string[] = ['id', 'name','employee', 'action'];
  subscription = new Subscription();

  constructor(private dialog:MatDialog,private store: Store,
    ) { 
      
    }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.GetAllProjects();
  }

  GetAllProjects(){
    this.store.dispatch(loadProject());
    this.store.select(getEmptyProject).subscribe(item=>{
      this.emptyProject = item;
      this.projectSource=new MatTableDataSource(this.emptyProject);
    })
  }

  addProject(){
    this.openpopup(0);
  }

  EditProject(projectId:number){
    this.openpopup(projectId);
  }

  DeleteProject(projectId:number){
      if(confirm('Are you sure you want to delete this record?')){
        this.store.dispatch(deleteProject({ projectId: projectId }));
      }
    }

  openpopup(projectId: number) {
      this.dialog.open(AddProjectComponent, {
        width: '50%',
        exitAnimationDuration: '750ms',
        enterAnimationDuration: '750ms',
        data: {
          'code': projectId
        }
      }).afterClosed().subscribe(item => {
        this.GetAllProjects();
      });
    }
}
