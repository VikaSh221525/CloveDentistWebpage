// =============================
// Section 4 - Accordion Logic
// =============================
document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion-item");
    const sideImage = document.getElementById("why-choose-img");
    const defaultImg = sideImage ? sideImage.src : "";

    accordionItems.forEach(function (item) {
        const header = item.querySelector(".accordion-item__header");

        header.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            // Close all items first
            accordionItems.forEach(function (otherItem) {
                otherItem.classList.remove("active");
                const icon = otherItem.querySelector(".accordion-item__icon");
                icon.textContent = "+";
            });

            if (!isActive) {
                // Open clicked item
                item.classList.add("active");
                const icon = item.querySelector(".accordion-item__icon");
                icon.textContent = "−";

                // Change image
                if (sideImage && item.dataset.img) {
                    sideImage.style.opacity = "0";
                    setTimeout(function () {
                        sideImage.src = item.dataset.img;
                        sideImage.style.opacity = "1";
                    }, 250);
                }
            } else {
                // If closing the active item, revert to default image
                if (sideImage) {
                    sideImage.style.opacity = "0";
                    setTimeout(function () {
                        sideImage.src = defaultImg;
                        sideImage.style.opacity = "1";
                    }, 250);
                }
            }
        });
    });

    // =============================
    // Reusable Drag to Scroll Function
    // =============================
    function enableDragScroll(selector) {
        const slider = document.querySelector(selector);
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener("mousedown", function (e) {
            isDown = true;
            slider.classList.add("dragging");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", function () {
            isDown = false;
            slider.classList.remove("dragging");
        });

        slider.addEventListener("mouseup", function () {
            isDown = false;
            slider.classList.remove("dragging");
        });

        slider.addEventListener("mousemove", function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Enable for all slider sections
    enableDragScroll(".rct-types__cards");      // Section 2
    enableDragScroll(".transformations__grid"); // Section 3
    enableDragScroll(".patients-say__track");    // Section 5
    enableDragScroll(".tech-section__cards");    // Section 7
    enableDragScroll(".clinics-grid");           // Section 9
    enableDragScroll(".google-reviews__track");  // Section 8

    // =============================
    // Section 11 - FAQ Accordion
    // =============================
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            // Close all other FAQ items
            faqItems.forEach(function (otherItem) {
                otherItem.classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
});
