import { Project } from "../../models/Project";

export interface ProjectModel {
    list: Project[],
    errormessage: string,
    emptyobject:Project,
}