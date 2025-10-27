document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intro-form");
    const output = document.getElementById("output");
    const clearBtn = document.getElementById("clear-btn");
    const addCourseBtn = document.getElementById("add-course-btn");
    const coursesContainer = document.getElementById("courses-container");
    const previewImage = document.getElementById("preview-image");
    const imageInput = document.getElementById("image");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        displayIntro();
    });

    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = "./images/josiah-with-cat.jpeg";
        }
    });

    clearBtn.addEventListener("click", () => {
        form.reset();
        previewImage.src = "./images/josiah-with-cat.jpeg";
        Array.from(form.querySelectorAll("input[type=text], input[type=date], textarea"))
            .forEach(input => input.value = "");
    });

    addCourseBtn.addEventListener("click", () => {
        const div = document.createElement("div");
        div.classList.add("course-entry");
        div.innerHTML = `
            <input type="text" name="course-courseNumber[]" placeholder="Course code" required style="max-width: 100px;">
            <input type="text" name="course-name[]" placeholder="Course name" required>
            <input type="text" name="course-why[]" placeholder="Why this course?" required>
            <button type="button" class="delete-course" style="background-color: red;">X</button>
        `;
        div.querySelector(".delete-course").addEventListener("click", () => div.remove());
        coursesContainer.appendChild(div);
    });

    document.querySelectorAll(".delete-course").forEach(btn => {
        btn.addEventListener("click", () => btn.parentElement.remove());
    });

    function displayIntro() {
        const formData = new FormData(form);
        const first = formData.get("first-name");
        const last = formData.get("last-name");
        const nickname = formData.get("nickname");
        const adj = formData.get("adjective");
        const animal = formData.get("animal");
        const caption = formData.get("caption");
        const personal = formData.get("personal");
        const academic = formData.get("academic");
        const professional = formData.get("professional");
        const quote = formData.get("quote");
        const author = formData.get("author");
        const thing = formData.get("thing");
        const share = formData.get("share");

        let courses = "";
        document.querySelectorAll("#courses-container .course-entry").forEach(course => {
            const code = course.querySelector("input[name='course-courseNumber[]']").value;
            const name = course.querySelector("input[name='course-name[]']").value;
            const why = course.querySelector("input[name='course-why[]']").value;
            courses += `<li>${code} - ${name} (${why})</li>`;
        });

        output.innerHTML = `
            <h2>${first} ${last}'s ${adj} ${animal}</h2>
            <img src="${previewImage.src}" alt="${caption}" style="max-width:250px;">
            <p><em>${caption}</em></p>
            <ul>
                <li><strong>Personal Background:</strong> ${personal}</li>
                <li><strong>Professional Background:</strong> ${professional}</li>
                <li><strong>Academic Background:</strong> ${academic}</li>
                <li><strong>Funny/Interesting:</strong> ${thing || "(none)"}</li>
                <li><strong>Something to Share:</strong> ${share || "(none)"}</li>
            </ul>
            <h3>Courses:</h3>
            <ul>${courses}</ul>
            <blockquote>"${quote}" — ${author}</blockquote>
            <a href="#" id="reset-output">Reset Form</a>
        `;

        document.getElementById("reset-output").addEventListener("click", () => {
            output.innerHTML = "";
            form.reset();
            previewImage.src = "./images/josiah-with-cat.jpeg";
        });
    }
});
