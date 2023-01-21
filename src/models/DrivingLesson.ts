import { DateTime } from "luxon"
import { Status } from "./enums/Status"

export type DrivingLesson = {
    id: number,
    instructorId: number,
    studentId: number,
    instructorName: string,
    studentName: string,
    startDate: DateTime,
    endDate: DateTime,
    status: Status
}