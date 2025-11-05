document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");
    const resetButton = document.getElementById("resetbutton");
    const instructionHeader = document.getElementById("introheader");

    // Image preview functionality
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
        }
    });

    // Function to add a new course entry
    function addCourse(courseNumber = "", name = "", why = "") {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-entry");

        courseDiv.innerHTML = `
            <input type="text" name="course-courseNumber[]" placeholder="Course code" required value="${courseNumber}" style="max-width: 100px;">
            <input type="text" name="course-name[]" placeholder="Course name" required value="${name}">
            <input type="text" name="course-why[]" placeholder="Why this course?" required value="${why}">
            <button type="button" class="delete-course" style="background-color: red;">X</button>
        `;
        
        courseDiv.querySelector(".delete-course").addEventListener("click", () => coursesContainer.removeChild(courseDiv));
        coursesContainer.appendChild(courseDiv);
    }

    // Default courses
    const defaultCourses = [
        ["ITSC-3160", "Database Design and Implementation", "Concentration Elective Course"],
        ["ITSC-2181", "Intro to Computer Systems", "Major required course"],
        ["ITIS-3135", "Front-End Web Application Development", "Concentration Technical Elective"],
        ["STAT-2122", "Intro to Prob & Stat", "Major required course"]
    ];
    defaultCourses.forEach(([courseNumber, name, why]) => addCourse(courseNumber, name, why));

    addCourseBtn.addEventListener("click", () => addCourse());

    // Reset functionality
    resetButton.addEventListener("click", function () {
        form.reset();
        previewImage.src = "./images/josiah-with-cat.jpeg"; // Reset to default image
        coursesContainer.innerHTML = ""; // Clear dynamic courses
        defaultCourses.forEach(([courseNumber, name, why]) => addCourse(courseNumber, name, why));
    });

    // Validate form before submission
    function validateForm() {
        if (!document.getElementById("acknowledgement").checked) {
            alert("You must acknowledge the disclaimer.");
            return false;
        }
        return true;
    }

    function formatFullName(firstName, middleInitial, nickname, lastName) {
        let fullName = firstName;
    
        if (nickname) {
            fullName += ` "${nickname}"`;
        }
    
        if (middleInitial) {
            fullName += ` ${middleInitial}.`;
        }
    
        fullName += ` ${lastName}`;
        return fullName;
    }

    // Display submitted data
    function displayResults() {
        const formData = new FormData(form);
        const imageSrc = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : previewImage.src;

        const firstName = formData.get("first-name").trim();
        const middleInitial = formData.get("middle-initial").trim();
        const nickname = formData.get("nickname").trim(); // Assuming nickname is stored in 'first-mascot'
        const lastName = formData.get("last-name").trim();
    
        const formattedName = formatFullName(firstName, middleInitial, nickname, lastName);

        const courses = formData.getAll("course-courseNumber[]").map((courseNumber, index) => `
            <li><strong>${courseNumber} - ${formData.getAll("course-name[]")[index]}: </strong> ${formData.getAll("course-why[]")[index]}</li>
        `).join("");

        const resultContainer = document.createElement("div");
        resultContainer.id = "result-container";
        resultContainer.innerHTML = `
            <h3>${formattedName} ${formData.get("divider")} ${formData.get("adjective")} ${formData.get("animal")}</h3>
            <figure class="center">
                <img src="${imageSrc}" height="200" alt="${formData.get("caption")}">
                <figcaption><i>${formData.get("caption")}</i></figcaption>
            </figure>

            <p>${formData.get("statement")}</p>

            <ul>
                <li><strong>Personal Background: </strong>${formData.get("personal")}</li>
                <li><strong>Professional Background: </strong>${formData.get("professional")}</li>
                <li><strong>Academic Background: </strong>${formData.get("academic")}</li>
                <li><strong>Background in this Subject: </strong>${formData.get("subject-background")}</li>
                <li><strong>Primary Computer: </strong>${formData.get("computer")}</li>
                <li><strong>Courses I'm Taking, & Why: </strong>
                    <ul>${courses}</ul>
                </li>
                <li><strong>Funny/Interesting Item to Remember me by: </strong>${formData.get("thing")}</li>
                <li><strong>I'd also like to share: </strong>${formData.get("share")}</li>
            </ul>

            <blockquote class="center">
                <q>${formData.get("quote")}</q>
                <br>
                <i>- ${formData.get("author")}</i>
            </blockquote>

            <button id="reloadButton">Reset</button>
        `;

        instructionHeader.classList.add("hide");
        form.replaceWith(resultContainer);

        document.getElementById("reloadButton").addEventListener("click", () => {
            location.reload();
        }); 
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) displayResults();
    });

    document.getElementById("resetbutton").addEventListener("click", function () {
        form.reset(); // Resets default values
        document.querySelectorAll("form input").forEach((input) => input.value = ""); // Clears everything
        document.getElementById("courses-container").innerHTML = ""; // Removes all dynamically added courses
    });
});
