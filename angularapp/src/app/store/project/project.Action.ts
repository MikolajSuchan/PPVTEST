import { createAction, props } from "@ngrx/store";
import { Project } from "../../models/Project";

export const LOAD_PROJECT = '[project] getall'
export const LOAD_PROJECT_SUCCESS = 'project getall suc'
export const LOAD_PROJECT_FAIL = 'project getall fail'

export const DELETE_PROJECT = '[project] delete'
export const DELETE_PROJECT_SUCC = '[project] delete succ'

export const ADD_PROJECT = '[project] add'
export const ADD_PROJECT_SUCC = '[project] add succ'

export const UPDATE_PROJECT = '[project] update'
export const UPDATE_PROJECT_SUCC = '[project] update succ'

export const GET_PROJECT = '[project] get project'

export const loadProject = createAction(LOAD_PROJECT)
export const loadProjectSuc = createAction(LOAD_PROJECT_SUCCESS, props<{ list: Project[] }>())
export const loadProjectFail = createAction(LOAD_PROJECT_FAIL, props<{ errMsg: string }>())

export const deleteProject = createAction(DELETE_PROJECT,props<{projectId:number}>())
export const deleteProjectSuc = createAction(DELETE_PROJECT_SUCC, props<{ projectId:number }>())

export const addProject = createAction(ADD_PROJECT,props<{data:Project}>())
export const addProjectSuc = createAction(ADD_PROJECT_SUCC, props<{ data:Project }>())

export const updateProject = createAction(UPDATE_PROJECT,props<{data:Project}>())
export const updateProjectSuc = createAction(UPDATE_PROJECT_SUCC, props<{ data:Project }>())

export const getProject = createAction(GET_PROJECT,props<{projectId:number}>())

export const emptyAction = createAction('empty')