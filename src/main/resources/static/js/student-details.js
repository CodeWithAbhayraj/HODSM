/* ==========================================================
   HOD Student Management System
   student-details.js
========================================================== */

// ===================================
// PAGE LOAD
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    if (!getAdmin() || !getToken()) {

        window.location.href = "admin-login.html";
        return;

    }

    loadStudentDetails();

});

// ===================================
// LOAD STUDENT DETAILS
// ===================================

async function loadStudentDetails() {

    if (!getAdmin() || !getToken()) {

        window.location.href = "admin-login.html";
        return;

    }

    const student = JSON.parse(
        localStorage.getItem("selectedStudent")
    );

    if (!student) {

        alert("Student data not found.");

        window.location.href = "admin-dashboard.html";

        return;

    }

    document.getElementById("studentName").innerText =
        student.fullName;

    document.getElementById("studentEmail").innerText =
        student.email;

    document.getElementById("studentMobile").innerText =
        student.mobile;

    document.getElementById("studentPrn").innerText =
        student.prn;

    document.getElementById("studentRollNo").innerText =
        student.rollNo;

    document.getElementById("studentDepartment").innerText =
        student.department;

    document.getElementById("studentSemester").innerText =
        student.semester;

    document.getElementById("studentAdmissionYear").innerText =
        student.admissionYear;

    document.getElementById("studentDob").innerText =
        student.dob;

    document.getElementById("studentGender").innerText =
        student.gender;

    document.getElementById("studentAddress").innerText =
        student.address;

    document.getElementById("studentAadhaar").innerText =
        student.aadhaar || "-";

    document.getElementById("studentCollegeId").innerText =
        student.collegeId || "-";

    document.getElementById("studentStatus").innerText =
        student.status;

    document.getElementById("studentRemarks").innerText =
        student.remarks || "-";

    if (student.photo && student.photo !== "") {

        document.getElementById("studentPhoto").src =
            student.photo;

    }

}

// ===================================
// APPROVE STUDENT
// ===================================

async function approveStudent() {

    if (!getAdmin() || !getToken()) {

        window.location.href = "admin-login.html";
        return;

    }

    const student = JSON.parse(
        localStorage.getItem("selectedStudent")
    );

    if (!confirm("Approve this student?"))
        return;

    try {

        const response = await fetch(

            API.APPROVE_STUDENT(student.id),

            getOptions("PUT")

        );

        const result = await handleResponse(response);

        alert(result.message);

        localStorage.removeItem("selectedStudent");

        window.location.href =
            "admin-dashboard.html";

    }

    catch (err) {

        console.log(err);

        if (err.message === "Unauthorized") {

            removeAdmin();
            removeToken();

            window.location.href =
                "admin-login.html";

            return;

        }

        alert(err.message || "Approval Failed");

    }

}

// ===================================
// REJECT STUDENT
// ===================================

async function rejectStudent() {

    if (!getAdmin() || !getToken()) {

        window.location.href = "admin-login.html";
        return;

    }

    const student = JSON.parse(
        localStorage.getItem("selectedStudent")
    );

    if (!confirm("Reject this student?"))
        return;

    try {

        const response = await fetch(

            API.REJECT_STUDENT(student.id),

            getOptions("PUT")

        );

        const result = await handleResponse(response);

        alert(result.message);

        localStorage.removeItem("selectedStudent");

        window.location.href =
            "admin-dashboard.html";

    }

    catch (err) {

        console.log(err);

        if (err.message === "Unauthorized") {

            removeAdmin();
            removeToken();

            window.location.href =
                "admin-login.html";

            return;

        }

        alert(err.message || "Reject Failed");

    }

}

// ===================================
// BACK
// ===================================

function goBack() {

    window.location.href =
        "admin-dashboard.html";

}