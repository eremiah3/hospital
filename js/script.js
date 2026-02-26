// ========================================
// PRELOADER
// ========================================

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");
});

// ========================================
// MOBILE NAVIGATION
// ========================================

const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle) {
  mobileToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animate hamburger menu
    const spans = this.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(8px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      const spans = mobileToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });
}

// ========================================
// STICKY NAVIGATION
// ========================================

const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

// Contact Form
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const form = contactForm.querySelector("form") || contactForm;

  // Create a form element if not exists
  if (!contactForm.querySelector("form")) {
    const formElement = document.createElement("form");
    while (contactForm.firstChild) {
      formElement.appendChild(contactForm.firstChild);
    }
    contactForm.appendChild(formElement);
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const phone = document.getElementById("phone")?.value;
    const subject = document.getElementById("subject")?.value;
    const message = document.getElementById("message")?.value;

    // Simple validation
    if (!name || !email || !phone || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Show success message
    alert(
      "Thank you for contacting us! We will get back to you within 24 hours.",
    );

    // Reset form
    this.reset();
  });
}

// ========================================
// APPOINTMENT FORM - MULTI-STEP
// ========================================

const appointmentForm = document.querySelector(".appointment-form");
if (appointmentForm) {
  let currentStep = 1;

  window.nextStep = function (step) {
    // Validate current step before moving forward
    const currentStepElement = document.getElementById("step" + currentStep);
    const inputs = currentStepElement.querySelectorAll(
      "input[required], select[required], textarea[required]",
    );

    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff6b6b";
      } else {
        input.style.borderColor = "#e0e0e0";
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    // Hide all steps
    document
      .querySelectorAll(".form-step")
      .forEach((s) => s.classList.remove("active"));

    // Show target step
    document.getElementById("step" + step).classList.add("active");

    // Update progress indicators
    document.querySelectorAll(".progress-step").forEach((s, i) => {
      if (i < step) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });

    currentStep = step;

    // Scroll to top of form
    appointmentForm.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  window.prevStep = function (step) {
    // Hide all steps
    document
      .querySelectorAll(".form-step")
      .forEach((s) => s.classList.remove("active"));

    // Show target step
    document.getElementById("step" + step).classList.add("active");

    // Update progress indicators
    document.querySelectorAll(".progress-step").forEach((s, i) => {
      if (i < step) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });

    currentStep = step;

    // Scroll to top of form
    appointmentForm.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle form submission
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all required fields
    const allInputs = this.querySelectorAll(
      "input[required], select[required], textarea[required]",
    );
    let isValid = true;

    allInputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
      }
    });

    // Check terms checkbox
    const termsCheckbox = document.getElementById("terms");
    if (termsCheckbox && !termsCheckbox.checked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Show success message
    alert(
      "Your appointment request has been submitted successfully! We will contact you within 24 hours to confirm your appointment.",
    );

    // Reset form
    this.reset();

    // Go back to step 1
    nextStep(1);
  });
}

// ========================================
// UPDATE DOCTORS BASED ON DEPARTMENT
// ========================================

window.updateDoctors = function () {
  const department = document.getElementById("department")?.value;
  const doctorSelect = document.getElementById("doctor");

  if (!doctorSelect) return;

  const doctors = {
    cardiology: ["Dr. Emmanuel Okafor", "Dr. Ibrahim Musa"],
    pediatrics: ["Dr. Chioma Nwosu", "Dr. Oluwaseun Balogun"],
    surgery: ["Dr. Adebayo Johnson", "Dr. Fatima Abubakar"],
    internal: ["Dr. Yusuf Mohammed", "Dr. Grace Okonkwo"],
    orthopedics: ["Dr. Tunde Bakare"],
    radiology: ["Dr. Funke Adeyemi"],
    neurology: ["Dr. Ahmed Hassan"],
    ophthalmology: ["Dr. Elizabeth Udoh"],
    laboratory: ["Any Available Technician"],
    dentistry: ["Any Available Dentist"],
    general: ["Any Available Doctor"],
  };

  doctorSelect.innerHTML = '<option value="">Any Available Doctor</option>';

  if (doctors[department]) {
    doctors[department].forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc;
      option.textContent = doc;
      doctorSelect.appendChild(option);
    });
  }
};

// ========================================
// SET MINIMUM DATE FOR APPOINTMENT
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("appointmentDate");
  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minDate = `${year}-${month}-${day}`;
    dateInput.setAttribute("min", minDate);
  }
});

// ========================================
// GALLERY FILTER
// ========================================

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryCategories = document.querySelectorAll(".gallery-category");

if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter categories
      galleryCategories.forEach((category) => {
        const categoryPhotos = category.querySelectorAll(".photo-item");
        let hasVisiblePhotos = false;

        categoryPhotos.forEach((photo) => {
          if (
            filter === "all" ||
            photo.getAttribute("data-category") === filter
          ) {
            photo.style.display = "block";
            hasVisiblePhotos = true;
          } else {
            photo.style.display = "none";
          }
        });

        // Hide category title if no photos are visible
        if (hasVisiblePhotos) {
          category.style.display = "block";
        } else {
          category.style.display = "none";
        }
      });
    });
  });
}

// ========================================
// IMAGE MODAL / LIGHTBOX
// ========================================

let currentImageIndex = 0;
let allImages = [];

window.openModal = function (button) {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  const photoItem = button.closest(".photo-item");
  const img = photoItem.querySelector("img");
  const overlay = photoItem.querySelector(".photo-overlay");
  const title = overlay.querySelector("h3").textContent;
  const description = overlay.querySelector("p").textContent;

  // Get all visible images
  allImages = Array.from(document.querySelectorAll(".photo-item")).filter(
    (item) => {
      return item.style.display !== "none";
    },
  );

  currentImageIndex = allImages.indexOf(photoItem);

  document.getElementById("modalImage").src = img.src;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeModal = function () {
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

window.navigateModal = function (direction) {
  if (allImages.length === 0) return;

  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = allImages.length - 1;
  } else if (currentImageIndex >= allImages.length) {
    currentImageIndex = 0;
  }

  const photoItem = allImages[currentImageIndex];
  const img = photoItem.querySelector("img");
  const overlay = photoItem.querySelector(".photo-overlay");
  const title = overlay.querySelector("h3").textContent;
  const description = overlay.querySelector("p").textContent;

  document.getElementById("modalImage").src = img.src;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;
};

// Close modal on outside click
window.onclick = function (event) {
  const modal = document.getElementById("imageModal");
  if (modal && event.target === modal) {
    closeModal();
  }
};

// Keyboard navigation for modal
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("imageModal");
  if (modal && modal.style.display === "flex") {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      navigateModal(-1);
    } else if (e.key === "ArrowRight") {
      navigateModal(1);
    }
  }
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(
    ".service-card, .doctor-card, .stat-card, .testimonial-card, .award-card, .mvv-card",
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
});

// ========================================
// EMERGENCY CALL BUTTON CONFIRMATION
// ========================================

const emergencyLinks = document.querySelectorAll('a[href*="911"]');
emergencyLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const confirmCall = confirm(
      "You are about to call the Emergency Hotline. Do you want to proceed?",
    );
    if (!confirmCall) {
      e.preventDefault();
    }
  });
});

// ========================================
// INPUT VALIDATION HELPERS
// ========================================

// Real-time email validation
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.style.borderColor = "#ff6b6b";

      // Show error message
      let errorMsg = this.nextElementSibling;
      if (!errorMsg || !errorMsg.classList.contains("error-message")) {
        errorMsg = document.createElement("span");
        errorMsg.classList.add("error-message");
        errorMsg.style.color = "#ff6b6b";
        errorMsg.style.fontSize = "0.85rem";
        errorMsg.style.marginTop = "0.25rem";
        errorMsg.style.display = "block";
        errorMsg.textContent = "Please enter a valid email address";
        this.parentNode.insertBefore(errorMsg, this.nextSibling);
      }
    } else {
      this.style.borderColor = "#e0e0e0";
      const errorMsg = this.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.remove();
      }
    }
  });
});

// Phone number formatting (Nigerian format)
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach((input) => {
  input.addEventListener("input", function () {
    // Remove all non-numeric characters
    let value = this.value.replace(/\D/g, "");

    // Limit to 11 digits for Nigerian numbers
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    this.value = value;
  });
});

// ========================================
// PRINT FUNCTIONALITY
// ========================================

window.printPage = function () {
  window.print();
};

// ========================================
// BACK TO TOP BUTTON
// ========================================

// Create back to top button
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute("id", "backToTop");
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #ADF802;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Scroll to top when clicked
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

backToTopBtn.addEventListener("mouseenter", function () {
  this.style.transform = "translateY(-5px)";
  this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
});

backToTopBtn.addEventListener("mouseleave", function () {
  this.style.transform = "translateY(0)";
  this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
  "%cT Elshadai Clinic and Maternity",
  "color: #0077be; font-size: 24px; font-weight: bold;",
);
console.log(
  "%cWebsite developed with care ❤️",
  "color: #666; font-size: 14px;",
);
console.log(
  "%cFor support, contact: Tolu.elshaddaihealthcare@gmail.com",
  "color: #666; font-size: 12px;",
);
