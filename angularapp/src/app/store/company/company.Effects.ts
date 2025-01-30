import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CompanyService } from "../../services/company.service";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { addCompany, addCompanySuc, deleteCompany, deleteCompanySuc, emptyAction, loadCompany, loadCompanyFail, loadCompanySuc, updateCompany, updateCompanySuc } from "./company.Action";

@Injectable()
export class CompanyEffects {
    actions$ = inject(Actions);
    service = inject(CompanyService);
    toastr = inject(ToastrService)


    _loadCompany = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCompany),
            exhaustMap(() => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadCompanySuc({ list: data })
                    }),
                    catchError((err) => of(loadCompanyFail({ errMsg: err.message })))
                )
            })
        )
    )

    _deleteCompany = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCompany),
            switchMap((action) => {
                return this.service.Delete(action.companyId).pipe(
                    switchMap((data) => {
                        return of(deleteCompanySuc({ companyId: action.companyId }),
                        this.Showalert('Deleted Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _addCompany = createEffect(() =>
        this.actions$.pipe(
            ofType(addCompany),
            switchMap((action) => {
                return this.service.Create(action.data).pipe(
                    switchMap((data) => {
                        return of(addCompanySuc({ data: action.data }),
                        this.Showalert('Created Successfully.','pass')
                    )
                    }),
                    catchError((err) => of(this.Showalert(err.message,'fail')))
                )
            })
        )
    )

    _updateCompany = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCompany),
            switchMap((action) => {
                return this.service.Update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateCompanySuc({ data: action.data }),
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