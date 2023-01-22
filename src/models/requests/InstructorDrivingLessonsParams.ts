import { DateTime } from "luxon"

export type InstructorDrivingLessonsParams = {
    studentId?: number,
    startDate?: DateTime,
    endDate?: DateTime
}