const Api = {
    BaseURL: "https://c452-5-14-151-29.eu.ngrok.io/api",
    IdClaim: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    RoleClaim: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    Routes: {
        Login: `login`,
        StudentRegister: "students/register",
        Availabilites: "users/{0}/availabilities",
        Students: "students",
        GetInstructorStudents: "instructors/{0}/students",
        AddStudentToInstructor: "instructors/{0}/students/{1}",
        DeleteStudentFromInstructor: "instructors/{0}/students/{1}",
        InstructorDrivingLessons: "instructors/{0}/driving-lessons",
        DeleteDrivingLesson: "driving-lessons/{0}",
        CreateDrivingLesson: "instructors/{0}/driving-lessons",
    }
};

const Roles = {
    Instructor: "instructor",
    Student: "student",
    Company: "company"
}
export { Api, Roles };