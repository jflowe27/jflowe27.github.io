document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const generateJSONBtn = document.getElementById("generateJSON");
    const instructionHeader = document.getElementById("introheader");

    generateJSONBtn.addEventListener("click", function () {
        const formData = new FormData(form);

        const jsonData = {
            firstName: formData.get("first-name"),
            preferredName: formData.get("nickname"),
            middleInitial: formData.get("middle-initial"),
            lastName: formData.get("last-name"),
            divider: formData.get("divider"),
            mascotAdjective: formData.get("adjective"),
            mascotAnimal: formData.get("animal"),
            image: formData.get("image") && formData.get("image").name
                ? `images/${formData.get("image").name}`
                : "images/josiah-with-cat.jpeg",
            imageCaption: formData.get("caption"),
            personalStatement: formData.get("statement"),
            personalBackground: formData.get("personal"),
            professionalBackground: formData.get("professional"),
            academicBackground: formData.get("academic"),
            subjectBackground: formData.get("subject-background"),
            primaryComputer: formData.get("computer"),
            courses: [],
            interestingThing: formData.get("thing"),
            toShare: formData.get("share"),
            quote: formData.get("quote"),
            quoteAuthor: formData.get("author"),
            links: [
                { name: "Webpage", href: formData.get("webpage") },
                { name: "GitHub", href: formData.get("github") },
                { name: "freeCodeCamp", href: formData.get("freecodecamp") },
                { name: "Codecademy", href: formData.get("codecademy") },
                { name: "LinkedIn", href: formData.get("linkedin") }
            ]
        };

        // Gather course data
        const courseNumbers = formData.getAll("course-courseNumber[]");
        const courseNames = formData.getAll("course-name[]");
        const courseWhys = formData.getAll("course-why[]");

        for (let i = 0; i < courseNumbers.length; i++) {
            const [dept, num] = courseNumbers[i].split("-");
            jsonData.courses.push({
                department: dept ? dept.trim() : "",
                number: num ? num.trim() : "",
                name: courseNames[i],
                reason: courseWhys[i]
            });
        }

        // Stringify the JSON with indentation
        const formattedJSON = JSON.stringify(jsonData, null, 2);

        // Escape for HTML display
        const escapedJSON = formattedJSON
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Output HTML block with highlight.js formatting
        const jsonOutput = `
<section id="json-output">
    <h2>Introduction JSON</h2>
    <pre><code class="language-json">${escapedJSON}</code></pre>
</section>`;

        instructionHeader.classList.add("hide");
        form.outerHTML = jsonOutput;

        // Re-run syntax highlighting
        hljs.highlightAll();
    });
});
