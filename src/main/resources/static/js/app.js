// /* ==========================================================
//    HOD Student Management System
//    app.js
// ========================================================== */
//
// document.addEventListener("DOMContentLoaded", function () {
//
//     console.log("Application Started");
//
//     initializeApplication();
//
// });
//
// // ================= INITIALIZE =================
//
// function initializeApplication() {
//
//     hideLoader();
//
//     highlightActiveMenu();
//
//     loadUserInfo();
//
//     loadTheme();
//
// }
//
// // ================= LOADER =================
//
// function showLoader() {
//
//     const loader = document.getElementById("loader");
//
//     if (loader) {
//
//         loader.style.display = "flex";
//
//     }
//
// }
//
// function hideLoader() {
//
//     const loader = document.getElementById("loader");
//
//     if (loader) {
//
//         loader.style.display = "none";
//
//     }
//
// }
//
// // ================= USER INFO =================
//
// function loadUserInfo() {
//
//     const student = getStudent();
//
//     const admin = getAdmin();
//
//     const nameElement = document.getElementById("loggedUserName");
//
//     if (!nameElement) {
//
//         return;
//
//     }
//
//     if (student) {
//
//         nameElement.innerText = student.fullName || "Student";
//
//     }
//
//     else if (admin) {
//
//         nameElement.innerText = admin.fullName || "Admin";
//
//     }
//
// }
//
// // ================= ACTIVE MENU =================
//
// function highlightActiveMenu() {
//
//     const currentPage = window.location.pathname.split("/").pop();
//
//     const links = document.querySelectorAll(".sidebar a");
//
//     links.forEach(link => {
//
//         const href = link.getAttribute("href");
//
//         if (href === currentPage) {
//
//             link.classList.add("active");
//
//         }
//
//     });
//
// }
//
// // ================= DARK MODE =================
//
// function loadTheme() {
//
//     const theme = localStorage.getItem("theme");
//
//     if (theme === "dark") {
//
//         document.body.classList.add("dark-mode");
//
//     }
//
// }
//
// function toggleTheme() {
//
//     document.body.classList.toggle("dark-mode");
//
//     if (document.body.classList.contains("dark-mode")) {
//
//         localStorage.setItem("theme", "dark");
//
//     } else {
//
//         localStorage.setItem("theme", "light");
//
//     }
//
// }
//
// // ================= NOTIFICATION =================
//
// function showNotification(message, type = "success") {
//
//     const notification = document.createElement("div");
//
//     notification.className = "notification";
//
//     notification.innerText = message;
//
//     notification.style.position = "fixed";
//
//     notification.style.top = "20px";
//
//     notification.style.right = "20px";
//
//     notification.style.padding = "15px 20px";
//
//     notification.style.borderRadius = "8px";
//
//     notification.style.color = "#fff";
//
//     notification.style.zIndex = "9999";
//
//     notification.style.backgroundColor =
//         type === "success" ? "#16a34a" : "#dc2626";
//
//     document.body.appendChild(notification);
//
//     setTimeout(() => {
//
//         notification.remove();
//
//     }, 3000);
//
// }
//
// // ================= DATE =================
//
// function getCurrentDate() {
//
//     return new Date().toLocaleDateString();
//
// }
//
// // ================= TIME =================
//
// function getCurrentTime() {
//
//     return new Date().toLocaleTimeString();
//
// }
//
// // ================= LOGOUT BUTTON =================
//
// const logoutButton = document.getElementById("logoutBtn");
//
// if (logoutButton) {
//
//     logoutButton.addEventListener("click", function () {
//
//         if (confirm("Are you sure you want to logout?")) {
//
//             clearAllStorage();
//
//             window.location.href = "index.html";
//
//         }
//
//     });
//
// }
//
// // ================= BACK BUTTON =================
//
// function goBack() {
//
//     window.history.back();
//
// }
//
// // ================= HOME =================
//
// function goHome() {
//
//     window.location.href = "index.html";
//
// }
//
// // ================= SCROLL =================
//
// function scrollTopPage() {
//
//     window.scrollTo({
//
//         top: 0,
//
//         behavior: "smooth"
//
//     });
//
// }
//
// // ================= REFRESH =================
//
// function refreshPage() {
//
//     location.reload();
//
// }