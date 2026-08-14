// /* ==========================================================
//    HOD Student Management System
//    storage.js
// ========================================================== */
//
// // ================= SAVE =================
//
// function saveStudent(student) {
//
//     localStorage.setItem(
//         STORAGE_KEYS.STUDENT,
//         JSON.stringify(student)
//     );
//
// }
//
// function saveAdmin(admin) {
//
//     localStorage.setItem(
//         STORAGE_KEYS.ADMIN,
//         JSON.stringify(admin)
//     );
//
// }
//
// function saveProfile(profile) {
//
//     localStorage.setItem(
//         STORAGE_KEYS.PROFILE,
//         JSON.stringify(profile)
//     );
//
// }
//
// function saveToken(token) {
//
//     localStorage.setItem(
//         STORAGE_KEYS.TOKEN,
//         token
//     );
//
// }
//
// // ================= GET =================
//
// function getStudent() {
//
//     const data = localStorage.getItem(STORAGE_KEYS.STUDENT);
//
//     return data ? JSON.parse(data) : null;
//
// }
//
// function getAdmin() {
//
//     const data = localStorage.getItem(STORAGE_KEYS.ADMIN);
//
//     return data ? JSON.parse(data) : null;
//
// }
//
// function getProfile() {
//
//     const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
//
//     return data ? JSON.parse(data) : null;
//
// }
//
// function getToken() {
//
//     return localStorage.getItem(STORAGE_KEYS.TOKEN);
//
// }
//
// // ================= CHECK LOGIN =================
//
// function isStudentLoggedIn() {
//
//     return getStudent() !== null;
//
// }
//
// function isAdminLoggedIn() {
//
//     return getAdmin() !== null;
//
// }
//
// // ================= REMOVE =================
//
// function removeStudent() {
//
//     localStorage.removeItem(STORAGE_KEYS.STUDENT);
//
// }
//
// function removeAdmin() {
//
//     localStorage.removeItem(STORAGE_KEYS.ADMIN);
//
// }
//
// function removeProfile() {
//
//     localStorage.removeItem(STORAGE_KEYS.PROFILE);
//
// }
//
// function removeToken() {
//
//     localStorage.removeItem(STORAGE_KEYS.TOKEN);
//
// }
//
// // ================= LOGOUT =================
//
// function clearAllStorage() {
//
//     removeStudent();
//
//     removeAdmin();
//
//     removeProfile();
//
//     removeToken();
//
// }
//
// // ================= PAGE PROTECTION =================
//
// // Student Pages
//
// function requireStudentLogin() {
//
//     if (!isStudentLoggedIn()) {
//
//         alert("Please login first.");
//
//         window.location.href = "student-login.html";
//
//     }
//
// }
//
// // Admin Pages
//
// function requireAdminLogin() {
//
//     if (!isAdminLoggedIn()) {
//
//         alert("Please login first.");
//
//         window.location.href = "admin-login.html";
//
//     }
//
// }
//
// // ================= USER INFO =================
//
// function getLoggedInUser() {
//
//     return getStudent() || getAdmin();
//
// }
//
// // ================= DEBUG =================
//
// function printStorage() {
//
//     console.log("Student :", getStudent());
//
//     console.log("Admin :", getAdmin());
//
//     console.log("Profile :", getProfile());
//
//     console.log("Token :", getToken());
//
// }