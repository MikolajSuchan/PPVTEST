import { createReducer, on } from "@ngrx/store";
import { ProjectState } from "./project.State";
import { addProjectSuc, deleteProjectSuc, getProject, loadProjectFail, loadProjectSuc, updateProjectSuc } from "../project/project.Action";


const _projectReducer = createReducer(ProjectState,
    on(loadProjectSuc, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: ''
        }
    }),
    on(loadProjectFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errMsg
        }
    }),
    on(deleteProjectSuc, (state, action) => {
        const _newdata = state.list.filter(o => o.id != action.projectId)
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(addProjectSuc, (state, action) => {
        const _newdata = { ...action.data };
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateProjectSuc, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.data.id ? action.data : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(getProject, (state, action) => {
        let _newdata = state.list.find(o =>o.id===action.projectId);
        if(_newdata==null){
            _newdata=state.emptyobject;
        }
        return {
            ...state,
            emptyobject:_newdata
        }
    })
);

export function projectReducer(state: any, action: any) {
    return _projectReducer(state, action);
}