import { Status } from "../enums/Status"
import { InstructorResponse } from "./InstructorResponse"
import { StudentResponse } from "./StudentResponse"

export type DrivingLessonResponse = {
    id: number,
    student: StudentResponse,
    instructor: InstructorResponse,
    startDate: string,
    endDate: string,
    status: Status
}