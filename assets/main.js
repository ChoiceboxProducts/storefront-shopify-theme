// Hide product images until loaded
function revealOnLoad(selector) {
  const images = document.querySelectorAll(selector);
  const LOADING_CLASS = "loading";

  images.forEach((image) => {
    if (!image.complete) {
      console.log(image);
      image.addEventListener("load", (event) => {
        event.target.classList.remove(LOADING_CLASS);
      });

      image.classList.add(LOADING_CLASS);
    }
  });
}