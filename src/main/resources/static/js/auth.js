// /* ==========================================================
//    HOD Student Management System
//    auth.js
// ========================================================== */
//
// // ============================
// // STUDENT REGISTER
// // ============================
//
// async function registerStudent(studentData) {
//
//     try {
//
//         const response = await fetch(STUDENT_API.REGISTER, {
//
//             method: "POST",
//
//             headers: JSON_HEADERS,
//
//             body: JSON.stringify(studentData)
//
//         });
//
//         const result = await response.json();
//
//         if (response.ok) {
//
//             alert("Student Registered Successfully");
//
//             window.location.href = "student-login.html";
//
//         } else {
//
//             alert(result.message || "Registration Failed");
//
//         }
//
//     } catch (error) {
//
//         console.error(error);
//
//         alert("Server Connection Failed");
//
//     }
//
// }
//
// // ============================
// // STUDENT LOGIN
// // ============================
//
// async function studentLogin(loginData) {
//
//     try {
//
//         const response = await fetch(STUDENT_API.LOGIN, {
//
//             method: "POST",
//
//             headers: JSON_HEADERS,
//
//             body: JSON.stringify(loginData)
//
//         });
//
//         const result = await response.json();
//
//         if (response.ok) {
//
//             localStorage.setItem("student", JSON.stringify(result));
//
//             alert("Login Successful");
//
//             window.location.href = "student-dashboard.html";
//
//         } else {
//
//             alert(result.message || "Invalid Email or Password");
//
//         }
//
//     } catch (error) {
//
//         console.error(error);
//
//         alert("Server Error");
//
//     }
//
// }
//
// // ============================
// // ADMIN LOGIN
// // ============================
//
// async function adminLogin(loginData) {
//
//     try {
//
//         const response = await fetch(ADMIN_API.LOGIN, {
//
//             method: "POST",
//
//             headers: JSON_HEADERS,
//
//             body: JSON.stringify(loginData)
//
//         });
//
//         const result = await response.json();
//
//         if (response.ok) {
//
//             localStorage.setItem("admin", JSON.stringify(result));
//
//             alert("Admin Login Successful");
//
//             window.location.href = "admin-dashboard.html";
//
//         } else {
//
//             alert(result.message || "Invalid Credentials");
//
//         }
//
//     } catch (error) {
//
//         console.error(error);
//
//         alert("Server Error");
//
//     }
//
// }
//
// // ============================
// // GET STUDENT BY ID
// // ============================
//
// async function getStudent(studentId) {
//
//     try {
//
//         const response = await fetch(
//
//             `${STUDENT_API.GET_BY_ID}/${studentId}`
//
//         );
//
//         const result = await response.json();
//
//         if (response.ok) {
//
//             return result;
//
//         }
//
//         alert(result.message);
//
//         return null;
//
//     } catch (error) {
//
//         console.error(error);
//
//         return null;
//
//     }
//
// }
//
// // ============================
// // DELETE STUDENT
// // ============================
//
// async function deleteStudent(studentId) {
//
//     if (!confirm("Delete this Student ?")) {
//
//         return;
//
//     }
//
//     try {
//
//         const response = await fetch(
//
//             `${STUDENT_API.GET_BY_ID}/${studentId}`,
//
//             {
//
//                 method: "DELETE"
//
//             }
//
//         );
//
//         const result = await response.json();
//
//         if (response.ok) {
//
//             alert(result.message);
//
//             location.reload();
//
//         } else {
//
//             alert(result.message);
//
//         }
//
//     } catch (error) {
//
//         console.error(error);
//
//     }
//
// }
//
// // ============================
// // LOGOUT
// // ============================
//
// function logout() {
//
//     localStorage.removeItem("student");
//
//     localStorage.removeItem("admin");
//
//     localStorage.removeItem("profile");
//
//     window.location.href = "index.html";
//
// }
//
// // ============================
// // LOGIN CHECK
// // ============================
//
// function isStudentLoggedIn() {
//
//     return localStorage.getItem("student") != null;
//
// }
//
// function isAdminLoggedIn() {
//
//     return localStorage.getItem("admin") != null;
//
// }
//
// // ============================
// // AUTO REDIRECT
// // ============================
//
// function checkStudentLogin() {
//
//     if (!isStudentLoggedIn()) {
//
//         window.location.href = "student-login.html";
//
//     }
//
// }
//
// function checkAdminLogin() {
//
//     if (!isAdminLoggedIn()) {
//
//         window.location.href = "admin-login.html";
//
//     }
//
// }