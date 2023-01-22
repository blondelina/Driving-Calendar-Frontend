import { CompanyResponse } from "./CompanyResponse";

export type InstructorResponse = {
    id: number,
    username: string,
    name: string,
    email: string,

    company: CompanyResponse
};