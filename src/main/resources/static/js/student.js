// ===================================
// STUDENT REGISTRATION
// ===================================

const registerForm = document.getElementById("studentRegisterForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Full Name Validation
        if (fullName.length < 5) {
            error("Full Name must be at least 5 characters.");
            return;
        }

        const nameRegex = /^[A-Za-z ]+$/;

        if (!nameRegex.test(fullName)) {
            error("Full Name can contain only letters and spaces.");
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            error("Please enter a valid email address.");
            return;
        }

        // Mobile Validation
        const mobileRegex = /^[6-9]\d{9}$/;

        if (!mobileRegex.test(mobile)) {
            error("Mobile Number must be exactly 10 digits.");
            return;
        }

        // Password Validation
        if (password.length < 8 || password.length > 15) {
            error("Password must be between 8 and 15 characters.");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,15}$/;

        if (!passwordRegex.test(password)) {
            error("Password must contain uppercase, lowercase, number and special character.");
            return;
        }

        // Confirm Password
        if (password !== confirmPassword) {
            error("Passwords do not match.");
            return;
        }

        const studentData = {

            fullName: fullName,

            email: email,

            mobile: mobile,

            password: password

        };

        try {

            const response = await fetch(

                API.STUDENT_REGISTER,

                getOptions("POST", studentData)

            );

            const result = await handleResponse(response);

            success("Registration Successful");

            window.location.href = "student-login.html";

        }

        catch (err) {

            console.log(err);

            error(err.message || "Registration Failed");

        }

    });

}




// ===================================
// SHOW / HIDE PASSWORD
// ===================================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

}

const confirmPasswordInput = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if (confirmPasswordInput && toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        if (confirmPasswordInput.type === "password") {

            confirmPasswordInput.type = "text";
            toggleConfirmPassword.classList.remove("fa-eye");
            toggleConfirmPassword.classList.add("fa-eye-slash");

        } else {

            confirmPasswordInput.type = "password";
            toggleConfirmPassword.classList.remove("fa-eye-slash");
            toggleConfirmPassword.classList.add("fa-eye");

        }

    });

}



// ===================================
// STUDENT LOGIN
// ===================================

const loginForm = document.getElementById("studentLoginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value.trim(),

            password: document.getElementById("password").value

        };

        try {

            const response = await fetch(

                API.STUDENT_LOGIN,

                getOptions("POST", loginData)

            );

            const student = await handleResponse(response);

            // Save Student
            saveStudent(student);

            // Save JWT Token
            localStorage.setItem("token", student.token);

            success("Login Successful");

            window.location.href = "student-dashboard.html";
        }

        catch (err) {

            error(err.message || "Invalid Email or Password");

            console.log(err);

        }

    });

}

// ===================================
// LOAD STUDENT DASHBOARD
// ===================================

async function loadDashboard() {

    //jwt
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "student-login.html";
        return;
    }

    if (!isStudentLoggedIn()) {

        window.location.href = "student-login.html";
        return;

    }

    const student = getStudent();

    try {

        const response = await fetch(

            API.STUDENT_BY_ID(student.id),

            getOptions("GET")

        );

        const data = await handleResponse(response);

        saveStudent(data);

        if (document.getElementById("studentName"))
            document.getElementById("studentName").innerText = data.fullName;

        if (document.getElementById("studentEmail"))
            document.getElementById("studentEmail").innerText = data.email;

        if (document.getElementById("studentMobile"))
            document.getElementById("studentMobile").innerText = data.mobile;

        if (document.getElementById("studentId"))
            document.getElementById("studentId").innerText = data.id;

        loadVerificationStatus(data.id);

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// LOAD PROFILE STATUS
// ===================================

async function loadVerificationStatus(studentId) {

    try {

        const response = await fetch(

            API.GET_PROFILE(studentId),

            getOptions("GET")

        );

        const profile = await handleResponse(response);

        if (document.getElementById("verificationStatus")) {

            document.getElementById("verificationStatus").innerText =
                profile.status;

        }

    }

    catch (err) {

        if (document.getElementById("verificationStatus")) {

            document.getElementById("verificationStatus").innerText =
                "PROFILE NOT CREATED";

        }

    }

}



// ===================================
// DELETE ACCOUNT
// ===================================

async function deleteStudent() {

    const student = getStudent();

    if (!student)
        return;

    const confirmDelete = confirm(
        "Are you sure you want to delete your account?"
    );

    if (!confirmDelete)
        return;

    try {

        const response = await fetch(

            API.DELETE_STUDENT(student.id),

            getOptions("DELETE")

        );

        const result = await handleResponse(response);

        success(result.message);

        removeStudent();

        window.location.href = "index.html";

    }

    catch (err) {

        console.log(err);

        error(err.message);

    }

}



// ===================================
// LOGOUT
// ===================================

function logoutStudent() {

    removeStudent();

    localStorage.removeItem("token");

    window.location.href = "student-login.html";

}


// ===================================
// AUTO LOAD
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname;

    if (page.includes("student-dashboard")) {

        loadDashboard();

    }

});


// ===================================
// LOGIN PASSWORD SHOW/HIDE
// ===================================

const loginEye = document.getElementById("toggleLoginPassword");

if (loginEye) {

    loginEye.addEventListener("click", () => {

        const password =
            document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";

            loginEye.classList.remove("fa-eye");
            loginEye.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            loginEye.classList.remove("fa-eye-slash");
            loginEye.classList.add("fa-eye");

        }

    });

}