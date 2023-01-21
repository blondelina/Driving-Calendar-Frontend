import { DateTime } from "luxon"

export type DrivingLessonsParams = {
    instructorId?: number,
    studentId?: number,
    startDate?: DateTime,
    endDate?: DateTime
}