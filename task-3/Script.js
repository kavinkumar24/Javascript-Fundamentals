const modal = document.getElementById("lightbox");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.getElementsByClassName("close")[0];

const thumbnails = document.querySelectorAll(".gallery_collections img");


thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", (e) => {
        const imagesrc = e.target.getAttribute("data-large");
        modalImg.src = imagesrc;
        modal.classList.add("show");
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});
