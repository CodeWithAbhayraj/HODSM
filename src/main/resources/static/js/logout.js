/* ==========================================================
   HOD Student Management System
   logout.js
========================================================== */

// ===================================
// STUDENT LOGOUT
// ===================================

function logoutStudent() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    removeStudent();

    success("Logout Successful");

    window.location.href = "student-login.html";

}



// ===================================
// ADMIN LOGOUT
// ===================================

function logoutAdmin() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    removeAdmin();

    success("Logout Successful");

    window.location.href = "admin-login.html";

}



// ===================================
// CHECK STUDENT LOGIN
// ===================================

function checkStudentLogin() {

    if (!isStudentLoggedIn()) {

        window.location.href = "student-login.html";

    }

}



// ===================================
// CHECK ADMIN LOGIN
// ===================================

function checkAdminLogin() {

    if (!isAdminLoggedIn()) {

        window.location.href = "admin-login.html";

    }

}



// ===================================
// CLEAR ALL STORAGE
// ===================================

function clearStorage() {

    localStorage.clear();

}



// ===================================
// SESSION EXPIRED
// ===================================

function sessionExpired() {

    clearStorage();

    alert("Session Expired. Please Login Again.");

    window.location.href = "index.html";

}