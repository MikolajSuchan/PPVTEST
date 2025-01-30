import { createReducer, on } from "@ngrx/store";
import { CompanyState } from "./company.State";
import { addCompanySuc, deleteCompanySuc, getCompany, loadCompanyFail, loadCompanySuc, updateCompanySuc } from "../company/company.Action";


const _companyReducer = createReducer(CompanyState,
    on(loadCompanySuc, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: ''
        }
    }),
    on(loadCompanyFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errMsg
        }
    }),
    on(deleteCompanySuc, (state, action) => {
        const _newdata = state.list.filter(o => o.id != action.companyId)
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(addCompanySuc, (state, action) => {
        const _newdata = { ...action.data };
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateCompanySuc, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.data.id ? action.data : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(getCompany, (state, action) => {
        let _newdata = state.list.find(o =>o.id===action.companyId);
        if(_newdata==null){
            _newdata=state.emptyobject;
        }
        return {
            ...state,
            emptyobject:_newdata
        }
    })
);

export function companyReducer(state: any, action: any) {
    return _companyReducer(state, action);
}