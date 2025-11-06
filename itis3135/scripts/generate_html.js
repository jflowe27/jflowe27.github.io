document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const generateHTMLBtn = document.getElementById("generateHTML");
    const instructionHeader = document.getElementById("introheader");
    const h2 = document.querySelector("main h2");

    generateHTMLBtn.addEventListener("click", function () {
        const formData = new FormData(form);

        const firstName = formData.get("first-name");
        const middleInitial = formData.get("middle-initial");
        const nickname = formData.get("nickname");
        const lastName = formData.get("last-name");
        const adjective = formData.get("adjective");
        const animal = formData.get("animal");
        const divider = formData.get("divider");
        const caption = formData.get("caption");

        const statement = formData.get("statement");
        const personal = formData.get("personal");
        const professional = formData.get("professional");
        const academic = formData.get("academic");
        const subjectBackground = formData.get("subject-background");
        const computer = formData.get("computer");
        const thing = formData.get("thing");
        const share = formData.get("share");
        const quote = formData.get("quote");
        const author = formData.get("author");

        let imageSrc = "./images/josiah-with-cat.jpeg"; // default image
        const uploadedFile = formData.get("image");
        if (uploadedFile && uploadedFile.name) {
            imageSrc = "images/" + uploadedFile.name; // relative safe path
        }

        const fullName = `${firstName}${nickname ? ` "${nickname}"` : ""}${middleInitial ? ` ${middleInitial}.` : ""} ${lastName}`;

        const courseNumbers = formData.getAll("course-courseNumber[]");
        const courseNames = formData.getAll("course-name[]");
        const courseWhys = formData.getAll("course-why[]");

        let courseList = "";
        if (courseNumbers.length > 0) {
            courseList = courseNumbers
                .map((num, i) => `<li><strong>${num} - ${courseNames[i]}:</strong> ${courseWhys[i]}</li>`)
                .join("\n"); // Joins each course with newlines, but no trailing one
        }


        const htmlContent = `
<h3>${fullName} ${divider} ${adjective} ${animal}</h3>
<figure>
    <img src="${imageSrc}" alt="${caption}">
    <figcaption>${caption}</figcaption>
</figure>
<p>${statement}</p>
<ul>
    <li><strong>Personal Background:</strong> ${personal}</li>
    <li><strong>Professional Background:</strong> ${professional}</li>
    <li><strong>Academic Background:</strong> ${academic}</li>
    <li><strong>Background in this Subject:</strong> ${subjectBackground}</li>
    <li><strong>Primary Computer:</strong> ${computer}</li>
    <li><strong>Courses I'm Taking & Why:</strong>
        <ul>
${courseList
    .split("\n")
    .map(line => "            " + line)
    .join("\n")}
        </ul>
    </li>
    <li><strong>Funny/Interesting Thing:</strong> ${thing}</li>
    <li><strong>I'd also like to share:</strong> ${share}</li>
</ul>
<blockquote>
    <q>${quote}</q><br>
    <i>- ${author}</i>
</blockquote>`;

        // Escape HTML for displaying as code
        const escapedHTML = htmlContent
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const htmlOutput = `
<section id="html-output">
    <h2>Introduction HTML</h2>
    <pre><code class="language-html">${escapedHTML}</code></pre>
</section>`;

        instructionHeader.classList.add("hide");
        form.outerHTML = htmlOutput;

        // Re-run syntax highlighting
        hljs.highlightAll();
    });
});
