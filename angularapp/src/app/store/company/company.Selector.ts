import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompanyModel } from "./company.Model";

const getCompanyState=createFeatureSelector<CompanyModel>('company')

export const getEmptyCompany=createSelector(getCompanyState,(state)=>{
    return state.list;
})

export const selectCompany=createSelector(getCompanyState,(state)=>{
    return state.emptyobject;
})