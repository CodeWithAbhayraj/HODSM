/* ==========================================================
   HOD Student Management System
   profile.js
========================================================== */

// ===================================
// PAGE LOAD
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    if (!window.location.pathname.includes("student-profile"))
        return;

    loadProfile();

    loadAdmissionYears();

    setDOBRange();

    //photo

    const photoInput = document.getElementById("photo");

    if (photoInput) {

        photoInput.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {

                const preview = document.getElementById("photoPreview");

                preview.src = e.target.result;

                preview.style.display = "block";

            };

            reader.readAsDataURL(file);

        });

    }

});

// ===================================
// LOAD PROFILE
// ===================================

async function loadProfile() {

    const student = getStudent();

    if (!student) {

        window.location.href = "student-login.html";
        return;

    }

    try {

        const response = await fetch(

            API.GET_PROFILE(student.id),

            getOptions("GET")

        );

        const profile = await handleResponse(response);

        document.getElementById("prn").value =
            profile.prn || "";

        document.getElementById("rollNo").value =
            profile.rollNo || "";

        document.getElementById("department").value =
            profile.department || "";

        document.getElementById("semester").value =
            profile.semester || "";

        document.getElementById("admissionYear").value =
            profile.admissionYear || "";

        document.getElementById("dob").value =
            profile.dob || "";

        document.getElementById("gender").value =
            profile.gender || "";

        document.getElementById("address").value =
            profile.address || "";

        document.getElementById("aadhaar").value =
            profile.aadhaar || "";

        document.getElementById("collegeId").value =
            profile.collegeId || "141";

        // Photo Preview

        if (profile.photo) {

            const preview = document.getElementById("photoPreview");

            if (preview) {

                preview.src = profile.photo;

                preview.style.display = "block";

            }

        }

    }

    catch (err) {

        console.log("Profile not created.");

    }

}

// ===================================
// GET PROFILE DATA
// ===================================

function getProfileData() {

    return {

        prn:
            document.getElementById("prn").value.trim(),

        rollNo:
            document.getElementById("rollNo").value.trim(),

        department:
        document.getElementById("department").value,

        semester:
            Number(document.getElementById("semester").value),

        admissionYear:
            Number(document.getElementById("admissionYear").value),

        dob:
        document.getElementById("dob").value,

        gender:
        document.getElementById("gender").value,

        address:
            document.getElementById("address").value.trim(),

        aadhaar:
            document.getElementById("aadhaar").value.trim(),

        collegeId:
            "141"

    };

}

// 2


// ===================================
// CREATE / UPDATE PROFILE
// ===================================

const profileForm = document.getElementById("studentProfileForm");

if (profileForm) {

    profileForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const student = getStudent();

        if (!student) {

            error("Please Login First");

            window.location.href = "student-login.html";

            return;

        }

        const profileData = getProfileData();

        // ===================================
        // PRN VALIDATION
        // ===================================

        if (!/^\d{10}$/.test(profileData.prn)) {

            error("PRN Number must be exactly 10 digits.");

            return;

        }

        // ===================================
        // ROLL NUMBER VALIDATION
        // ===================================

        if (profileData.rollNo.length === 0) {

            error("Roll Number is required.");

            return;

        }

        // ===================================
        // AADHAAR VALIDATION
        // ===================================

        if (!/^\d{12}$/.test(profileData.aadhaar)) {

            error("Aadhaar Number must be exactly 12 digits.");

            return;

        }

        // ===================================
        // SEMESTER VALIDATION
        // ===================================

        if (![1, 2, 3, 4].includes(profileData.semester)) {

            error("Please enter valid Semester (1 to 4).");

            return;

        }

        // ===================================
        // ADMISSION YEAR VALIDATION
        // ===================================

        const currentYear = new Date().getFullYear();

        if (
            profileData.admissionYear < currentYear - 2 ||
            profileData.admissionYear > currentYear
        ) {

            error("Admission Year must be current year or previous 2 years.");

            return;

        }

        // ===================================
        // ADDRESS VALIDATION
        // ===================================

        const address = profileData.address.trim();

        if (address.length < 10 || address.length > 200) {

            error("Address must contain between 10 and 200 characters.");

            return;

        }

        // ===================================
        // AGE VALIDATION
        // ===================================

        const dob = new Date(profileData.dob);

        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();

        const month = today.getMonth() - dob.getMonth();

        if (
            month < 0 ||
            (month === 0 && today.getDate() < dob.getDate())
        ) {

            age--;

        }

        if (age < 21 || age > 30) {

            error("Age must be between 21 and 30 years.");

            return;

        }

        // ===================================
        // PHOTO VALIDATION
        // ===================================

        const photoFile = document.getElementById("photo").files[0];

        if (!photoFile) {

            error("Please upload profile photo.");

            return;

        }

        // ===================================
        // FORM DATA
        // ===================================

        const formData = new FormData();

        formData.append("prn", profileData.prn);
        formData.append("rollNo", profileData.rollNo);
        formData.append("department", profileData.department);
        formData.append("semester", profileData.semester);
        formData.append("admissionYear", profileData.admissionYear);
        formData.append("dob", profileData.dob);
        formData.append("gender", profileData.gender);
        formData.append("address", profileData.address);
        formData.append("aadhaar", profileData.aadhaar);
        formData.append("collegeId", profileData.collegeId);

        formData.append("photo", photoFile);

        try {

            const checkResponse = await fetch(

                API.GET_PROFILE(student.id),

                getOptions("GET")

            );

            const token = getToken();

            let response;

            if (checkResponse.ok) {

                response = await fetch(

                    API.UPDATE_PROFILE(student.id),

                    {

                        method: "PUT",

                        headers: {

                            Authorization: "Bearer " + token

                        },

                        body: formData

                    }

                );

            }

            else {

                response = await fetch(

                    API.CREATE_PROFILE(student.id),

                    {

                        method: "POST",

                        headers: {

                            Authorization: "Bearer " + token

                        },

                        body: formData

                    }

                );

            }
            const result = await handleResponse(response);

            success(result.message || "Profile Saved Successfully");

        }

        catch (err) {

            console.log(err);

            error(err.message || "Profile Save Failed");

        }

    });

}

// 3

// ===================================
// SUBMIT FOR VERIFICATION
// ===================================

async function submitProfile() {

    const student = getStudent();

    if (!student) {

        error("Please Login First");

        window.location.href = "student-login.html";

        return;

    }

    if (!confirm("Submit Profile For Verification?")) {

        return;

    }

    try {

        const response = await fetch(

            API.SUBMIT_PROFILE(student.id),

            getOptions("POST")

        );

        const result = await handleResponse(response);

        success(result.message);

        window.location.href = "student-dashboard.html";

    }

    catch (err) {

        console.log(err);

        error(err.message || "Submission Failed");

    }

}

// ===================================
// RESET PROFILE FORM
// ===================================

function resetProfileForm() {

    if (profileForm) {

        profileForm.reset();

    }

    const preview = document.getElementById("photoPreview");

    if (preview) {

        preview.src = "";

        preview.style.display = "none";

    }

}

// ===================================
// LOAD ADMISSION YEARS
// ===================================

function loadAdmissionYears() {

    const select = document.getElementById("admissionYear");

    if (!select) return;

    const currentYear = new Date().getFullYear();

    select.innerHTML = "";

    for (let year = currentYear; year >= currentYear - 2; year--) {

        const option = document.createElement("option");

        option.value = year;

        option.textContent = year;

        select.appendChild(option);

    }

}

// 4

// ===================================
// DOB RANGE (21 - 30 YEARS)
// ===================================

function setDOBRange() {

    const dob = document.getElementById("dob");

    if (!dob) return;

    const today = new Date();

    // Maximum DOB (21 years)
    const maxDate = new Date(
        today.getFullYear() - 21,
        today.getMonth(),
        today.getDate()
    );

    // Minimum DOB (30 years)
    const minDate = new Date(
        today.getFullYear() - 30,
        today.getMonth(),
        today.getDate()
    );

    dob.min = minDate.toISOString().split("T")[0];
    dob.max = maxDate.toISOString().split("T")[0];

}

// ===================================
// PHOTO PREVIEW
// ===================================

const photoInput = document.getElementById("photo");

if (photoInput) {

    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const preview = document.getElementById("photoPreview");

        if (!preview) return;

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    });

}

// ===================================
// RESET PHOTO PREVIEW
// ===================================

function clearPhotoPreview() {

    const preview = document.getElementById("photoPreview");

    if (preview) {

        preview.src = "";

        preview.style.display = "none";

    }

}

// ===================================
// END OF FILE
// ===================================