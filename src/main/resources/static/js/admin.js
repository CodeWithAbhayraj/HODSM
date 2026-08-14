/* ==========================================================
   HOD Student Management System
   admin.js
========================================================== */

// ===================================
// ADMIN LOGIN
// ===================================

const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value.trim(),

            password: document.getElementById("password").value

        };

        try {

            const response = await fetch(

                API.ADMIN_LOGIN,

                getOptions("POST", loginData)

            );

            const result = await handleResponse(response);

            // Save Admin
            saveAdmin(result);

            // Save JWT Token
            saveToken(result.token);

            success("Admin Login Successful");

            window.location.href = "admin-dashboard.html";

        }

        catch (err) {

            console.log(err);

            error(err.message || "Invalid Email or Password");

        }

    });

}



// ===================================
// LOAD ADMIN DASHBOARD
// ===================================

async function loadAdminDashboard() {

    if (!isAdminLoggedIn()) {

        window.location.href = "admin-login.html";

        return;

    }

    try {

        const response = await fetch(

            API.ADMIN_DASHBOARD,

            getOptions("GET")

        );

        const dashboard = await handleResponse(response);

        document.getElementById("totalStudents").innerText =
            dashboard.totalStudents;

        document.getElementById("pendingStudents").innerText =
            dashboard.pendingStudents;

        document.getElementById("approvedStudents").innerText =
            dashboard.approvedStudents;

        document.getElementById("rejectedStudents").innerText =
            dashboard.rejectedStudents;

        loadPendingStudents();

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// LOAD PENDING REQUESTS
// ===================================

async function loadPendingStudents() {

    try {

        const response = await fetch(

            API.PENDING_REQUESTS,

            getOptions("GET")

        );

        const students = await handleResponse(response);

        const tbody = document.getElementById("pendingTableBody");

        if (!tbody)
            return;

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.fullName}</td>

                <td>${student.prn}</td>

                <td>${student.department}</td>

                <td>${student.status}</td>

                <td>

                    <button
                        onclick="viewStudent(${student.id})">

                        View

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

// ===================================
// VIEW STUDENT DETAILS
// ===================================

async function viewStudent(profileId) {

    try {

        const response = await fetch(

            API.STUDENT_DETAILS(profileId),

            getOptions("GET")

        );

        const student = await handleResponse(response);

        localStorage.setItem(
            "selectedStudent",
            JSON.stringify(student)
        );

        window.location.href = "student-details.html";

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// APPROVE STUDENT
// ===================================

async function approveStudent(profileId) {

    if (!confirm("Approve this student?"))
        return;

    try {

        const response = await fetch(

            API.APPROVE_STUDENT(profileId),

            getOptions("PUT")

        );

        const result = await handleResponse(response);

        success(result.message);

        loadAdminDashboard();

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// REJECT STUDENT
// ===================================

async function rejectStudent(profileId) {

    if (!confirm("Reject this student?"))
        return;

    try {

        const response = await fetch(

            API.REJECT_STUDENT(profileId),

            getOptions("PUT")

        );

        const result = await handleResponse(response);

        success(result.message);

        loadAdminDashboard();

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// SEARCH STUDENT
// ===================================

async function searchStudent() {

    const keyword = document
        .getElementById("searchKeyword")
        .value
        .trim();

    if (keyword === "") {

        loadPendingStudents();

        return;

    }

    try {

        const response = await fetch(

            API.SEARCH_STUDENT(keyword),

            getOptions("GET")

        );

        const students = await handleResponse(response);

        const tbody =
            document.getElementById("pendingTableBody");

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.fullName}</td>

                <td>${student.prn}</td>

                <td>${student.department}</td>

                <td>${student.status}</td>

                <td>

                    <button onclick="viewStudent(${student.id})">

                        View

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// ADMIN LOGOUT
// ===================================

function logoutAdmin() {

    removeAdmin();

    removeToken();

    window.location.href = "admin-login.html";

}



// ===================================
// AUTO LOAD
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    if (window.location.pathname.includes("admin-dashboard")) {

        loadAdminDashboard();

    }

});