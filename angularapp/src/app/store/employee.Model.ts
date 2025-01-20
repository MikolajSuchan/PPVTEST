import { Employee } from "../models/Employee";

export interface EmployeeModel {
    list: Employee[],
    errormessage: string,
    emptyobject:Employee,
}