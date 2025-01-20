import { EmployeeModel } from "./employee.Model";


export const EmployeeState:EmployeeModel={
    list: [],
    errormessage: "",
    emptyobject:{
        id: 0,
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        date: new Date(),

    }
}