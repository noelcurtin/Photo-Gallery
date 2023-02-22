(function() {
  /**
   * Constants
   */
  const PSE = document.querySelectorAll(".pswp")[0];
  const UI = PhotoSwipeUI_Default;
  const galleryLinks = document.querySelectorAll(".gallery a");
  const galleryButtons = document.querySelectorAll("button[data-ps-gallery]");

  /**
   * Functions
   */
  const getGalleryItems = function($galleryElement) {
    const $figures = $galleryElement.querySelectorAll("figure");

    let items = [];

    $figures.forEach($figure => {
      const $image = $figure.querySelector("img"),
        $link = $figure.querySelector("a"),
        $figcaption = $figure.querySelector("figcaption");

      let item = {};

      item.src = $link.href;
      item.msrc = $image.src;
      item.w = 1200;
      item.h = 900;

      if ($figcaption) {
        item.title = $figcaption.textContent || $figcaption.innerText;
      }

      items.push(item);
    });

    return items;
  };

  const galleryClick = function(event) {
    event.preventDefault();

    const $element = this,
      is_gallery_link = Boolean($element.closest(".gallery")),
      $galleryElement = is_gallery_link
        ? $element.closest(".gallery")
        : document.getElementById($element.getAttribute("data-ps-gallery"));

    // Bail if no element found
    if (!$galleryElement) {
      return;
    }

    // More consts!
    const $links = $galleryElement.querySelectorAll("a"),
      dataSettings = $galleryElement.getAttribute("data-ps-options");

    let items = [];
    let options = {};
    let index = 0;
    let settings = JSON.parse(dataSettings);

    // Combine / Overwrite settings.
    if (settings) {
      options = settings;
    }

    // Get items.
    items = getGalleryItems($galleryElement);

    // Bail if no items.
    if (!items.length) {
      return;
    }

    // Get the index of the link.
    if (is_gallery_link) {
      index = Array.prototype.indexOf.call($links, this);
    }

    // Add index in the options
    options.index = index;

    // Create gallery
    const gallery = new PhotoSwipe(PSE, UI, items, options);

    // Start it up!
    gallery.init();
  };

  galleryLinks.forEach(element => {
    element.addEventListener("click", galleryClick);
  });
  galleryButtons.forEach(element => {
    element.addEventListener("click", galleryClick);
  });
})();
