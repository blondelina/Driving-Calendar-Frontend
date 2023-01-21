import { Status } from "../enums/Status"

export type DrivingLessonResponse = {
    id: number,
    instructorId: number,
    studentId: number,
    instructorName: string,
    studentName: string,
    startDate: string,
    endDate: string,
    status: Status
}