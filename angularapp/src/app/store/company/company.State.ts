import { CompanyModel } from "./company.Model";


export const CompanyState:CompanyModel={
    list: [],
    errormessage: "",
    emptyobject:{
        id: 0,
        name: "",
        industry: "", 
        isActive: false,
        hasRemoteWork: false,


    }
}