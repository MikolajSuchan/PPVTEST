import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectModel } from "./project.Model";

const getProjectState=createFeatureSelector<ProjectModel>('project')

export const getEmptyProject=createSelector(getProjectState,(state)=>{
    return state.list;
})

export const selectProject=createSelector(getProjectState,(state)=>{
    return state.emptyobject;
})