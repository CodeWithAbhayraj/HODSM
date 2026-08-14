/* ==========================================================
   HOD Student Management System
   config.js
========================================================== */

// ================================
// BACKEND BASE URL
// ================================

const BASE_URL = "http://localhost:8080/api";

// ================================
// API ENDPOINTS
// ================================

const API = {

    // Student APIs
    STUDENT_REGISTER: `${BASE_URL}/student/register`,
    STUDENT_LOGIN: `${BASE_URL}/student/login`,
    STUDENT_BY_ID: (id) => `${BASE_URL}/student/${id}`,
    DELETE_STUDENT: (id) => `${BASE_URL}/student/${id}`,

    // Student Profile APIs
    CREATE_PROFILE: (id) => `${BASE_URL}/profile/${id}`,
    UPDATE_PROFILE: (id) => `${BASE_URL}/profile/${id}`,
    GET_PROFILE: (id) => `${BASE_URL}/profile/${id}`,
    SUBMIT_PROFILE: (id) => `${BASE_URL}/profile/submit/${id}`,

    // Admin APIs
    ADMIN_LOGIN: `${BASE_URL}/admin/login`,
    ADMIN_DASHBOARD: `${BASE_URL}/admin/dashboard`,
    PENDING_REQUESTS: `${BASE_URL}/admin/pending`,
    STUDENT_DETAILS: (id) => `${BASE_URL}/admin/student/${id}`,
    APPROVE_STUDENT: (id) => `${BASE_URL}/admin/approve/${id}`,
    REJECT_STUDENT: (id) => `${BASE_URL}/admin/reject/${id}`,
    SEARCH_STUDENT: (keyword) =>
        `${BASE_URL}/admin/search?keyword=${encodeURIComponent(keyword)}`
};


// ================================
// STORAGE KEYS
// ================================

const STORAGE = {

    STUDENT: "student",

    ADMIN: "admin",

    TOKEN: "token"

};


// ================================
// TOKEN FUNCTIONS
// ================================

function saveToken(token) {

    localStorage.setItem(STORAGE.TOKEN, token);

}

function getToken() {

    return localStorage.getItem(STORAGE.TOKEN);

}

function removeToken() {

    localStorage.removeItem(STORAGE.TOKEN);

}


// ================================
// COMMON FETCH OPTIONS
// ================================

function getOptions(method, body = null) {

    const token = getToken();

    const headers = {

        "Content-Type": "application/json"

    };

    if (token) {

        headers["Authorization"] = "Bearer " + token;

    }

    const options = {

        method,

        headers

    };

    if (body) {

        options.body = JSON.stringify(body);

    }

    return options;

}


// ================================
// RESPONSE HANDLER
// ================================

async function handleResponse(response) {

    const text = await response.text();

    let data = {};

    try {

        data = text ? JSON.parse(text) : {};

    } catch (e) {

        data = { message: text };

    }

    if (!response.ok) {

        throw data;

    }

    return data;

}


// ================================
// ALERTS
// ================================

function success(message) {

    alert(message);

}

function error(message) {

    alert(message);

}


// ================================
// STUDENT STORAGE
// ================================

function saveStudent(student) {

    localStorage.setItem(

        STORAGE.STUDENT,

        JSON.stringify(student)

    );

}

function getStudent() {

    return JSON.parse(

        localStorage.getItem(STORAGE.STUDENT)

    );

}

function removeStudent() {

    localStorage.removeItem(STORAGE.STUDENT);

}


// ================================
// ADMIN STORAGE
// ================================

function saveAdmin(admin) {

    localStorage.setItem(

        STORAGE.ADMIN,

        JSON.stringify(admin)

    );

}

function getAdmin() {

    return JSON.parse(

        localStorage.getItem(STORAGE.ADMIN)

    );

}

function removeAdmin() {

    localStorage.removeItem(STORAGE.ADMIN);

}


// ================================
// LOGIN CHECK
// ================================

function isStudentLoggedIn() {

    return getStudent() != null && getToken() != null;

}

function isAdminLoggedIn() {

    return getAdmin() != null && getToken() != null;

}


// ================================
// LOGOUT
// ================================

function logoutStudent() {

    removeStudent();

    removeToken();

    window.location.href = "student-login.html";

}

function logoutAdmin() {

    removeAdmin();

    removeToken();

    window.location.href = "admin-login.html";

}


// ================================
// REDIRECT
// ================================

function goTo(page) {

    window.location.href = page;

}

console.log("HODSM Config Loaded Successfully");