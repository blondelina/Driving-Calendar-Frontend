const Api = {
    BaseURL: "https://5749-2a02-2f0e-a0e-6100-d93c-ed8b-41c4-8b8a.eu.ngrok.io/api",
    IdClaim: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    RoleClaim: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    Routes: {
        Login: `login`,
        StudentRegister: "students/register",
        Availabilites: "users/{0}/availabilities",
        Students: "students",
        GetInstructorStudents: "instructors/{0}/students",
        AddStudentToInstructor: "instructors/{0}/students/{1}",
    }
};

const Roles = {
    Instructor: "instructor",
    Student: "student",
    Company: "company"
}
export { Api, Roles };