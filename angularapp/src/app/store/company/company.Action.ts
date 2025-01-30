import { createAction, props } from "@ngrx/store";
import { Company } from "../../models/Company";

export const LOAD_COMPANY = '[company] getall'
export const LOAD_COMPANY_SUCCESS = 'company getall suc'
export const LOAD_COMPANY_FAIL = 'company getall fail'

export const DELETE_COMPANY = '[company] delete'
export const DELETE_COMPANY_SUCC = '[company] delete succ'

export const ADD_COMPANY = '[company] add'
export const ADD_COMPANY_SUCC = '[company] add succ'

export const UPDATE_COMPANY = '[company] update'
export const UPDATE_COMPANY_SUCC = '[company] update succ'

export const GET_COMPANY = '[company] get company'


export const loadCompany = createAction(LOAD_COMPANY)
export const loadCompanySuc = createAction(LOAD_COMPANY_SUCCESS, props<{ list: Company[] }>())
export const loadCompanyFail = createAction(LOAD_COMPANY_FAIL, props<{ errMsg: string }>())

export const deleteCompany = createAction(DELETE_COMPANY,props<{companyId:number}>())
export const deleteCompanySuc = createAction(DELETE_COMPANY_SUCC, props<{ companyId:number }>())

export const addCompany = createAction(ADD_COMPANY,props<{data:Company}>())
export const addCompanySuc = createAction(ADD_COMPANY_SUCC, props<{ data:Company }>())

export const updateCompany = createAction(UPDATE_COMPANY,props<{data:Company}>())
export const updateCompanySuc = createAction(UPDATE_COMPANY_SUCC, props<{ data:Company }>())

export const getCompany = createAction(GET_COMPANY,props<{companyId:number}>())

export const emptyAction = createAction('empty')
