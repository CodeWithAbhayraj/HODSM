/* ==========================================================
   HOD Student Management System
   dashboard.js
========================================================== */

// ===================================
// PAGE LOAD
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    if (!window.location.pathname.includes("student-dashboard"))
        return;

    loadDashboard();

});

// ===================================
// LOAD DASHBOARD
// ===================================

async function loadDashboard() {

    const student = getStudent();

    if (!student || !getToken()) {

        window.location.href = "student-login.html";

        return;

    }

    try {

        const response = await fetch(

            API.STUDENT_BY_ID(student.id),

            getOptions("GET")

        );

        const data = await handleResponse(response);

        saveStudent(data);

        document.getElementById("studentName").innerText =
            data.fullName;

        document.getElementById("studentEmail").innerText =
            data.email;

        document.getElementById("studentMobile").innerText =
            data.mobile;

        loadProfileStatus();

    }

    catch (err) {

        console.log(err);

        error(err.message || "Unable to load dashboard.");

        if (err.message === "Unauthorized") {

            removeStudent();
            removeToken();

            window.location.href = "student-login.html";

        }

    }

}

// ===================================
// PROFILE STATUS
// ===================================

async function loadProfileStatus() {

    const student = getStudent();

    if (!student || !getToken()) {

        window.location.href = "student-login.html";

        return;

    }

    try {

        const response = await fetch(

            API.GET_PROFILE(student.id),

            getOptions("GET")

        );

        const profile = await handleResponse(response);

        document.getElementById("verificationStatus").innerText =
            profile.status;

        document.getElementById("department").innerText =
            profile.department;

        document.getElementById("semester").innerText =
            profile.semester;

    }

    catch (err) {

        document.getElementById("verificationStatus").innerText =
            "Profile Not Created";

        document.getElementById("department").innerText =
            "-";

        document.getElementById("semester").innerText =
            "-";

    }

}

// ===================================
// OPEN PROFILE
// ===================================

function openProfile() {

    window.location.href = "student-profile.html";

}

// ===================================
// REFRESH DASHBOARD
// ===================================

function refreshDashboard() {

    loadDashboard();

}