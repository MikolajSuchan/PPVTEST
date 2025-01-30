import { Company } from "../../models/Company";

export interface CompanyModel {
    list: Company[],
    errormessage: string,
    emptyobject:Company,
}