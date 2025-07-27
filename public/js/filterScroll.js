document.addEventListener("DOMContentLoaded", () => {
    const leftScrollBtn = document.querySelector("#scroll-left-btn");
    const rightScrollBtn = document.querySelector("#scroll-right-btn");
    const filtersContainerEl = document.querySelector("#filters .main");
    
    leftScrollBtn.addEventListener("click", () => {
        filtersContainerEl.scrollBy({
            left: -150,
            behavior: "smooth"
        });
    });

    rightScrollBtn.addEventListener("click", () => {
        filtersContainerEl.scrollBy({
            left: 150,
            behavior: "smooth"
        });
    });
});