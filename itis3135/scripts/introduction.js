document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");
    const clearBtn = document.getElementById("clear-btn");
    const outputSection = document.getElementById("output");

    // -----------------------------
    // IMAGE PREVIEW
    // -----------------------------
    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
        }
    });

    // -----------------------------
    // ADD COURSE ENTRY
    // -----------------------------
    function addCourse(courseNumber = "", name = "", why = "") {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-entry");

        courseDiv.innerHTML = `
            <input type="text" name="course-courseNumber[]" placeholder="Course code" required value="${courseNumber}" style="max-width: 100px;">
            <input type="text" name="course-name[]" placeholder="Course name" required value="${name}">
            <input type="text" name="course-why[]" placeholder="Why this course?" required value="${why}">
            <button type="button" class="delete-course" style="background-color: red;">X</button>
        `;

        courseDiv.querySelector(".delete-course").addEventListener("click", () => {
            coursesContainer.removeChild(courseDiv);
        });

        coursesContainer.appendChild(courseDiv);
    }

    const defaultCourses = [
        ["ITSC-3160", "Database Design and Implementation", "Concentration Elective Course"],
        ["ITSC-2181", "Intro to Computer Systems", "Major required course"],
        ["ITIS-3135", "Front-End Web Application Development", "Concentration Technical Elective"],
        ["STAT-2122", "Intro to Prob & Stat", "Major required course"],
    ];
    defaultCourses.forEach(([courseNumber, name, why]) => addCourse(courseNumber, name, why));

    addCourseBtn.addEventListener("click", () => addCourse());

    // -----------------------------
    // CLEAR BUTTON
    // -----------------------------
    clearBtn.addEventListener("click", () => {
        form.reset();
        previewImage.src = "./images/josiah-with-cat.jpeg";
        coursesContainer.innerHTML = "";
    });

    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    function validateForm() {
        const statementChecked = document.getElementById("statement").checked;
        if (!statementChecked) {
            alert("You must acknowledge the statement before submitting.");
            return false;
        }
        return true;
    }

    // -----------------------------
    // FORMAT FULL NAME
    // -----------------------------
    function formatFullName(first, middle, nickname, last) {
        let fullName = first;
        if (nickname) fullName += ` "${nickname}"`;
        if (middle) fullName += ` ${middle}.`;
        fullName += ` ${last}`;
        return fullName;
    }

    // -----------------------------
    // DISPLAY SUBMISSION RESULTS
    // -----------------------------
    function displayResults() {
        const formData = new FormData(form);
        const firstName = formData.get("first-name").trim();
        const middleInitial = formData.get("middle-initial").trim();
        const nickname = formData.get("nickname").trim();
        const lastName = formData.get("last-name").trim();
        const fullName = formatFullName(firstName, middleInitial, nickname, lastName);

        const imageSrc = imageInput.files.length > 0
            ? URL.createObjectURL(imageInput.files[0])
            : previewImage.src;

        // Collect courses
        const courseNumbers = formData.getAll("course-courseNumber[]");
        const courseNames = formData.getAll("course-name[]");
        const courseWhys = formData.getAll("course-why[]");

        let courseList = "";
        for (let i = 0; i < courseNumbers.length; i++) {
            if (courseNumbers[i] && courseNames[i]) {
                courseList += `
                    <li><strong>${courseNumbers[i]} - ${courseNames[i]}:</strong> ${courseWhys[i]}</li>
                `;
            }
        }

        // Build output identical to your HTML example
        outputSection.innerHTML = `
            <main>
                <h2>Introduction</h2>

                <figure style="text-align: center;">
                    <img src="${imageSrc}" height="200" class="center" alt="${formData.get("caption") || "User Image"}">
                    <figcaption><i>${formData.get("caption") ? `${formData.get("caption")}` : ""}</i></figcaption>
                </figure>

                <ul>
                    <li><strong>Personal Background: </strong>${formData.get("personal")}</li>
                    <li><strong>Professional Background: </strong>${formData.get("professional")}</li>
                    <li><strong>Academic Background: </strong>${formData.get("academic")}</li>
                    <li><strong>Background in this Subject: </strong>${formData.get("subject-background")}</li>
                    <li><strong>Primary Computer: </strong>${formData.get("computer")}</li>
                    <li><strong>Courses I'm Taking, & Why: </strong>
                        <ul>${courseList}</ul>
                    </li>
                    ${formData.get("thing") ? `<li><strong>Funny/Interesting Item to Remember me by: </strong>${formData.get("thing")}</li>` : ""}
                    ${formData.get("share") ? `<li><strong>I'd also like to share: </strong>${formData.get("share")}</li>` : ""}
                    ${formData.get("quote") ? `<li><strong>Favorite Quote: </strong>"${formData.get("quote")}" — ${formData.get("author")}</li>` : ""}
                </ul>

                <div style="text-align:center; margin-top: 2em;">
                    <button type="button" onclick="location.reload()" style="padding: 10px 20px; font-size: 1em;">Back to Form</button>
                </div>
            </main>
        `;

        // Apply background and font styling similar to your reference
        document.body.style.backgroundColor = "#FCF5D9";
        document.body.style.fontFamily = "Helvetica, sans-serif";
        document.body.style.textAlign = "center";
        document.body.style.margin = "0 auto";
        document.body.style.maxWidth = "800px";
        document.body.style.width = "90%";

        // Hide the form, show the formatted intro
        form.style.display = "none";
        outputSection.style.display = "block";
    }

    // -----------------------------
    // SUBMIT EVENT
    // -----------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateForm()) displayResults();
    });
});
