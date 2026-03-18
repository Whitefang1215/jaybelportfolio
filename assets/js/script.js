'use strict';

// ------------------------------
// Element toggle function
// ------------------------------
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// ------------------------------
// Sidebar toggle (mobile)
// ------------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ------------------------------
// Testimonials modal (optional)
// ------------------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Only run if testimonials exist
if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ------------------------------
// Portfolio filter / select
// ------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle select dropdown
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// Filter function
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();

    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Select dropdown click
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    if (selectValue) selectValue.innerText = this.innerText;

    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter buttons click
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    if (selectValue) selectValue.innerText = this.innerText;

    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ------------------------------
// Contact form
// ------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (formInputs.length) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ------------------------------
// Page navigation
// ------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// ------------------------------
// VIDEO MODAL (click play button only)
// ------------------------------
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoSource = modalVideo ? modalVideo.querySelector("source") : null;
const closeVideoBtn = document.querySelector(".close-btn");

if (videoModal && modalVideo && videoSource) {
  
  // Open modal only on play button click
  document.querySelectorAll(".project-card .project-item-icon-box").forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent card clicks
      const card = icon.closest(".project-card");
      const videoSrc = card.getAttribute("data-video");
      if (!videoSrc) return;

      videoSource.src = videoSrc;
      modalVideo.load();
      modalVideo.play();

      videoModal.classList.add("active");
    });
  });

  // Close modal on close button click
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", () => {
      videoModal.classList.remove("active");
      modalVideo.pause();
      modalVideo.currentTime = 0;
    });
  }

  // Close modal when clicking outside the video
  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active");
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });
}

// ------------------------------
// IMAGE MODAL (FIXED)
// ------------------------------
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImg");
const closeImageBtn = document.querySelector(".close-image");

document.querySelectorAll(".project-item .view-image").forEach(icon => {
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const imgSrc = this.getAttribute("data-img");
    if (!imgSrc) return;

    modalImage.src = imgSrc;
    imageModal.style.display = "block";
  });
});

if (closeImageBtn) {
  closeImageBtn.addEventListener("click", () => {
    imageModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    imageModal.style.display = "none";
  }
});