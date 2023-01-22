import { DateTime } from "luxon";
import { StudentResponse } from "./StudentResponse";

export type StudentDetailResponse = StudentResponse & {
    examDate?: string
}