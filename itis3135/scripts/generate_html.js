document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const outputSection = document.getElementById("output");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");
    const generateHTMLBtn = document.getElementById("generate-html-btn");

    generateHTMLBtn.addEventListener("click", () => {
        const formData = new FormData(form);

        // Format the full name
        const first = formData.get("first-name");
        const middle = formData.get("middle-initial");
        const nickname = formData.get("nickname");
        const last = formData.get("last-name");
        const fullName = `${first}${nickname ? ` "${nickname}"` : ""}${middle ? ` ${middle}.` : ""} ${last}`;

        // Mascot & divider
        const divider = formData.get("divider") || "||";
        const mascot = `${formData.get("adjective")} ${formData.get("animal")}`;

        // Determine image source
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
                courseList += `\n        <li><strong>${courseNumbers[i]} - ${courseNames[i]}:</strong> ${courseWhys[i]}</li>`;
            }
        }

        // Construct HTML output
        const htmlOutput = `
<h2>Introduction HTML</h2>
<h3>${fullName} ${divider} ${mascot}</h3>
<figure>
    <img src="${imageSrc}" alt="${formData.get("caption")}">
    <figcaption>${formData.get("caption")}</figcaption>
</figure>
<ul>
    <li><strong>Personal Background:</strong> ${formData.get("personal")}</li>
    <li><strong>Professional Background:</strong> ${formData.get("professional")}</li>
    <li><strong>Academic Background:</strong> ${formData.get("academic")}</li>
    <li><strong>Background in this Subject:</strong> ${formData.get("subject-background")}</li>
    <li><strong>Primary Computer:</strong> ${formData.get("computer")}</li>
    <li><strong>Courses I'm Taking, & Why:</strong>
        <ul>${courseList}
        </ul>
    </li>
    ${formData.get("thing") ? `<li><strong>Funny/Interesting Item to Remember Me By:</strong> ${formData.get("thing")}</li>` : ""}
    ${formData.get("share") ? `<li><strong>I'd Also Like to Share:</strong> ${formData.get("share")}</li>` : ""}
    ${formData.get("quote") ? `<li><strong>Favorite Quote:</strong> "${formData.get("quote")}" — ${formData.get("author")}</li>` : ""}
</ul>
<p>
    <a href="${formData.get("link1")}">${formData.get("link1")}</a><br>
    <a href="${formData.get("link2")}">${formData.get("link2")}</a><br>
    <a href="${formData.get("link3")}">${formData.get("link3")}</a><br>
    <a href="${formData.get("link4")}">${formData.get("link4")}</a><br>
    <a href="${formData.get("link5")}">${formData.get("link5")}</a>
</p>`;

        // Replace form with syntax-highlighted HTML
        form.style.display = "none";
        outputSection.innerHTML = `
            <pre><code class="language-html">${escapeHTML(htmlOutput)}</code></pre>
        `;
        hljs.highlightAll();
    });

    // Function to escape HTML so it displays literally
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
});
