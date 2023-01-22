import { DateTime } from "luxon"
import { Status } from "./enums/Status"
import { InstructorResponse } from "./responses/InstructorResponse"
import { StudentResponse } from "./responses/StudentResponse"

export type DrivingLesson = {
    id: number,
    student: StudentResponse,
    instructor: InstructorResponse,
    startDate: DateTime,
    endDate: DateTime,
    status: Status
}