/* ==========================================================
   HOD Student Management System
   search.js
========================================================== */

// ===================================
// SEARCH STUDENT
// ===================================

async function searchStudent() {

    if (!getAdmin() || !getToken()) {

        window.location.href = "admin-login.html";
        return;

    }

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

        const tableBody =
            document.getElementById("pendingTableBody");

        tableBody.innerHTML = "";

        if (students.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="6">

                        No Student Found

                    </td>

                </tr>

            `;

            return;

        }

        students.forEach(student => {

            tableBody.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.fullName}</td>

                    <td>${student.prn}</td>

                    <td>${student.department}</td>

                    <td>${student.status}</td>

                    <td>

                        <button class="view-btn"
                            onclick="viewStudent(${student.id})">

                            View

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (err) {

        console.error(err);

        if (err.message === "Unauthorized") {

            removeAdmin();
            removeToken();

            window.location.href = "admin-login.html";

            return;

        }

        error(err.message || "Search Failed");

    }

}

// ===================================
// SEARCH ON ENTER
// ===================================

const searchBox = document.getElementById("searchKeyword");

if (searchBox) {

    searchBox.addEventListener("keyup", function (e) {

        if (e.key === "Enter") {

            searchStudent();

        }

    });

}

// ===================================
// LIVE SEARCH
// ===================================

if (searchBox) {

    searchBox.addEventListener("input", function () {

        if (this.value.trim() === "") {

            loadPendingStudents();

        }

    });

}