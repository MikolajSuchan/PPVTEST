import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../services/project.service";

import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { addProject, addProjectSuc, deleteProject, deleteProjectSuc, emptyAction, loadProject, loadProjectFail, loadProjectSuc, updateProject, updateProjectSuc } from "./project.Action";

@Injectable()
export class ProjectEffects {
    actions$ = inject(Actions);
    service = inject(ProjectService);
    toastr = inject(ToastrService)


    _loadProject = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProject),
            exhaustMap(() => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadProjectSuc({ list: data })
                    }),
                    catchError((err) => of(loadProjectFail({ errMsg: err.message })))
                )
            })
        )
    )

    _deleteProject = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProject),
            switchMap((action) => {
                return this.service.Delete(action.projectId).pipe(
                    switchMap((data) => {
                        return of(deleteProjectSuc({ projectId: action.projectId }),
                        this.Showalert('Deleted Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _addProject = createEffect(() =>
        this.actions$.pipe(
            ofType(addProject),
            switchMap((action) => {
                return this.service.Create(action.data).pipe(
                    switchMap((data) => {
                        return of(addProjectSuc({ data: action.data }),
                        this.Showalert('Created Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _updateProject = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProject),
            switchMap((action) => {
                return this.service.Update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateProjectSuc({ data: action.data }),
                        this.Showalert('Updated Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    Showalert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message);
        }else{
            this.toastr.error(message);
        }
        return emptyAction();
    }

}