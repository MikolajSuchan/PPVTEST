import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeModel } from "./employee.Model";

const getEmployeeState=createFeatureSelector<EmployeeModel>('emp')

export const getEmptyList=createSelector(getEmployeeState,(state)=>{
    return state.list;
})

export const selectEmployee=createSelector(getEmployeeState,(state)=>{
    return state.emptyobject;
})