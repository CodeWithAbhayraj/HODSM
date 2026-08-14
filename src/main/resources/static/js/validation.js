// /* ==========================================================
//    HOD Student Management System
//    validation.js
// ==========================================================*/
//
// // ================= NAME =================
//
// function validateName(name) {
//
//     const regex = /^[A-Za-z ]{3,50}$/;
//
//     return regex.test(name.trim());
//
// }
//
// // ================= EMAIL =================
//
// function validateEmail(email) {
//
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//
//     return regex.test(email.trim());
//
// }
//
// // ================= MOBILE =================
//
// function validateMobile(mobile) {
//
//     const regex = /^[6-9]\d{9}$/;
//
//     return regex.test(mobile.trim());
//
// }
//
// // ================= PRN =================
//
// function validatePRN(prn) {
//
//     return prn.trim().length >= 8;
//
// }
//
// // ================= ROLL NUMBER =================
//
// function validateRollNumber(rollNumber) {
//
//     return rollNumber.trim().length >= 3;
//
// }
//
// // ================= PASSWORD =================
//
// function validatePassword(password) {
//
//     /*
//       Minimum 8 Characters
//       One Uppercase
//       One Lowercase
//       One Number
//       One Special Character
//     */
//
//     const regex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//
//     return regex.test(password);
//
// }
//
// // ================= CONFIRM PASSWORD =================
//
// function confirmPassword(password, confirmPassword) {
//
//     return password === confirmPassword;
//
// }
//
// // ================= REQUIRED =================
//
// function isEmpty(value) {
//
//     return value.trim() === "";
//
// }
//
// // ================= SHOW ERROR =================
//
// function showError(input, message) {
//
//     input.style.border = "2px solid red";
//
//     input.focus();
//
//     alert(message);
//
// }
//
// // ================= REMOVE ERROR =================
//
// function clearError(input) {
//
//     input.style.border = "1px solid #d1d5db";
//
// }
//
// // ================= STUDENT REGISTER =================
//
// function validateStudentRegister(form) {
//
//     const fullName = form.fullName;
//
//     const email = form.email;
//
//     const mobile = form.mobile;
//
//     const prn = form.prn;
//
//     const rollNumber = form.rollNumber;
//
//     const password = form.password;
//
//     const confirm = form.confirmPassword;
//
//     if (isEmpty(fullName.value)) {
//
//         showError(fullName, "Full Name is required");
//
//         return false;
//
//     }
//
//     if (!validateName(fullName.value)) {
//
//         showError(fullName, "Enter valid Full Name");
//
//         return false;
//
//     }
//
//     clearError(fullName);
//
//     if (!validateEmail(email.value)) {
//
//         showError(email, "Enter valid Email");
//
//         return false;
//
//     }
//
//     clearError(email);
//
//     if (!validateMobile(mobile.value)) {
//
//         showError(mobile, "Enter valid Mobile Number");
//
//         return false;
//
//     }
//
//     clearError(mobile);
//
//     if (!validatePRN(prn.value)) {
//
//         showError(prn, "Invalid PRN");
//
//         return false;
//
//     }
//
//     clearError(prn);
//
//     if (!validateRollNumber(rollNumber.value)) {
//
//         showError(rollNumber, "Invalid Roll Number");
//
//         return false;
//
//     }
//
//     clearError(rollNumber);
//
//     if (!validatePassword(password.value)) {
//
//         showError(
//             password,
//             "Password must contain Uppercase, Lowercase, Number and Special Character"
//         );
//
//         return false;
//
//     }
//
//     clearError(password);
//
//     if (!confirmPassword(password.value, confirm.value)) {
//
//         showError(confirm, "Passwords do not match");
//
//         return false;
//
//     }
//
//     clearError(confirm);
//
//     return true;
//
// }
//
// // ================= LOGIN =================
//
// function validateLogin(email, password) {
//
//     if (!validateEmail(email)) {
//
//         alert("Invalid Email");
//
//         return false;
//
//     }
//
//     if (password.trim().length < 6) {
//
//         alert("Invalid Password");
//
//         return false;
//
//     }
//
//     return true;
//
// }
//
// // ================= PROFILE =================
//
// function validateProfile(form) {
//
//     if (!validateName(form.fullName.value)) {
//
//         alert("Invalid Name");
//
//         return false;
//
//     }
//
//     if (!validateMobile(form.mobile.value)) {
//
//         alert("Invalid Mobile Number");
//
//         return false;
//
//     }
//
//     if (!validateEmail(form.email.value)) {
//
//         alert("Invalid Email");
//
//         return false;
//
//     }
//
//     return true;
//
// }
//
// // ================= RESET =================
//
// function resetForm(formId) {
//
//     document.getElementById(formId).reset();
//
// }
//
// // ================= SUCCESS =================
//
// function showSuccess(message) {
//
//     alert(message);
//
// }
//
// // ================= ERROR =================
//
// function showFailure(message) {
//
//     alert(message);
//
// }
