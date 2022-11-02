document.addEventListener("DOMContentLoaded", () => {

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
    
        return rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight)
    };

    const items = document.querySelectorAll(".snap-item");

    window.addEventListener("scroll", () => {
        console.log("hija");
        items.forEach((item, index) => {
            const inView = isElementInViewport(item);
    
            if (inView) {
                console.log(index);
            };
        });
    });
});