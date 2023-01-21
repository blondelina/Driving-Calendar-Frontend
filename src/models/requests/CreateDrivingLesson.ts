import { DateTime } from "luxon"

export type CreateDrivingLesson = {
    studentId: number,
    startDate: DateTime,
    endDate: DateTime
}