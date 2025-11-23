/* jQuery + jQuery UI interactions for all pages */

$(document).ready(function () {
    /* =====================
       HOME PAGE: CAROUSEL
    ======================*/
    if ($(".hero-art img").length) {
        let images = [
            "assets/gallery/bubbles.jpeg",
            "assets/gallery/cherries.jpeg",
            "assets/gallery/graduation.jpeg",
            "assets/gallery/scream.jpeg",
            "assets/gallery/whale-shark.jpeg",
            "assets/gallery/windows.jpeg"
        ];

        let index = 0;
        setInterval(function () {
            index = (index + 1) % images.length;
            $(".hero-art img").fadeOut(600, function () {
                $(this).attr("src", images[index]).fadeIn(600);
            });
        }, 3000);
    }

    /* =====================
       GALLERY PAGE: TABS + LIGHTBOX + AJAX
    ======================*/
    if ($("#galleryTabs").length) {
        
        $("#galleryTabs").tabs({
            activate: function(event, ui) {
                const tabId = ui.newPanel.attr("id");
                showTab(tabId);
            }
        });

        let allContainer = $("#all");
        let combinedGrid = $('<div class="gallery-grid"></div>');
        allContainer.append(combinedGrid);

        $("#galleryTabs section.gallery").not("#all").each(function () {
            $(this).find("figure").each(function () {
                combinedGrid.append($(this).clone());
            });
        });

        showTab("all");

        function showTab(category) {
            if (category === "all") {
                $(".gallery-grid").children().show();
            } else {
                $(".gallery-grid").children().hide();

                $("#" + category + " .gallery-grid").children().show();
            }
        }

        showTab("all");

        $(".gallery-grid img").on("click", function () {
            const src = $(this).attr("src");
            const caption = $(this).next().text();
            $("<div>")
                .html(`<img src='${src}' style='width:100%'><p>${caption}</p>`)
                .dialog({ modal: true, title: caption, width: 500 });
        });

    }

    /* =====================
       ABOUT PAGE: ACCORDION
    ======================*/
    if ($(".bio").length) {
        const accordionHTML = `
            <div class='aboutAccordion'>
                <h3>Bio</h3>
                <div><p>Ronnie enjoys art as a hobby. They paint, draw, do paper mache, crochet, and nake jewelery, along with other smaller crafts, like sculpting.</p></div>
                <h3>Inspirations</h3>
                <div><p>Ronnie draws inspiration from nature, other creators and artists, pinterest, and their experiences and likes.</p></div>
                <h3>Techniques</h3>
                <div><p>Ronnie uses many techniques to create, Many of their techniques involve layering and adjusting until they are satisfied with a piece.</p></div>
            </div>
        `;

        $(".bio").after(accordionHTML);
        $(".aboutAccordion").accordion();
    }

    /* =====================
       CONTACT PAGE: FORM VALIDATION
    ======================*/
    if ($("#contactForm").length) {
        $("#contactForm").on("submit", function (e) {
            e.preventDefault();

            let valid = true;
            $(this).find("input, textarea").each(function () {
                if (!$(this).val().trim()) {
                    valid = false;
                    $(this).css("border", "2px solid red");
                } else {
                    $(this).css("border", "");
                }
            });

            if (valid) {
                $("#formMsg").text("Message sent successfully!");
                $(this)[0].reset();
            } else {
                $("#formMsg").text("Please complete all fields.");
            }
        });
    }
});
