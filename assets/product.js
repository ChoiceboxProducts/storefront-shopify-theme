// Check to see if the user navigated to the product page from the
// Choicebox product page(s) using `document.referrer`.
(function () {
  // TODO: Dynamically update the 'back to product listing' link depending
  // on where the user came from. If the referrer contains:
  //  * From a Choicebox product listing page -> back to the correct page#
  //  * From another site -> back to the main Choicebox product listing page
  //  * Bookmark/direct -> back to the main Choicebix product listing page
}());

console.log(window);

// Modify the URL when the user selects product options; swap out 'Add to
// cart' button with `out of stock` when variant is unavailable.
(function (productVariants) {
  const actionBar = document.getElementById("product-action-bar");
  const sizeRadioButtons = document.querySelectorAll(".product-options input[type='radio']");
  const variants = productVariants;

  function swapContent(fromTemplateId, toTemplateId) {
    const toTemplate = document.getElementById(toTemplateId);

    if (toTemplate) {
      actionBar.replaceChild(toTemplate.content, toTemplate);
      const fromTemplate = document.createElement("template");
      fromTemplate.id = fromTemplateId;

      const fromContent = document.getElementById(`${fromTemplateId}-content`);
      actionBar.insertBefore(fromTemplate, fromContent);
      fromTemplate.content.appendChild(fromContent);
    }
  }

  sizeRadioButtons.forEach((variantOption, index) => {
    const variantId = variantOption.value;
    const variant = variants[index];

    variantOption.addEventListener("click", () => {
      window.history.replaceState(null, null, `?variant=${variantId}`);

      // Toggle 'add to cart' message
      if (variant.available) {
        swapContent("product-is-not-available", "product-is-available");
      } else {
        swapContent("product-is-available", "product-is-not-available");
      }
    });
  });
})(productVariants);

// Disable 'Add to cart' button after being clicked
(function () {
  const productForm = document.forms["add-to-cart-form"];
  const addToCartButtons = productForm.querySelectorAll("[type='submit']");

  productForm.addEventListener("submit", () => {
    addToCartButtons.forEach((button) => {
      button.disabled = true;
    });
  });
}());

// Swap the product images when selected
(function () {
  const productThumbnails = document.querySelectorAll(".product-thumbnails > a");
  const SELECTED_THUMBNAIL_CLASSNAME = "selected";
  const imageViewer = document.querySelector(".product-photos .product-photo img");

  productThumbnails.forEach((thumbnail) => {
    thumbnail.removeAttribute("href");
    thumbnail.addEventListener("mousedown", () => {
      const selectedThumbnails = thumbnail.parentNode.querySelectorAll(`.${SELECTED_THUMBNAIL_CLASSNAME}`);
      selectedThumbnails.forEach((selectedThumbnail) => {
        selectedThumbnail.classList.remove(SELECTED_THUMBNAIL_CLASSNAME);
      });

      thumbnail.classList.add(SELECTED_THUMBNAIL_CLASSNAME);
      const thumbnailImage = thumbnail.querySelector(".thumbnail");

      imageViewer.src = thumbnailImage.src
        .replace(`width=${thumbnailImage.getAttribute("width")}`, 'width=480')
        .replace(`height=${thumbnailImage.getAttribute("height")}`, 'height=480')
    })
  });
}());

revealOnLoad(".product-photos .product-photo img");