const Api = {
    BaseURL: "https://ae3d-5-14-136-121.eu.ngrok.io/api",
    IdClaim: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    RoleClaim: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    Routes: {
        Login: `login`,
        StudentRegister: "students/register",
        GetStudents: "/students"
    }
};

const Roles = {
    Instructor: "instructor",
    Student: "student",
    Company: "company"
}
export { Api, Roles };