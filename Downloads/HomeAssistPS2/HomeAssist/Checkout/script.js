// Service data for different types
const serviceData = {
  "furniture-assembly": {
    title: "Furniture Assembly",
    description:
      "Professional furniture assembly service for all types of furniture",
    image: "/HomeAssist/assets/ServiceTab1.jpg",
    basePrice: 50,
  },
  "tv-mounting": {
    title: "TV Mounting",
    description: "Expert TV mounting and installation service",
    image: "/HomeAssist/assets/ServiceTab2.jpg",
    basePrice: 75,
  },
  "moving-help": {
    title: "Moving Help",
    description: "Professional moving and heavy lifting assistance",
    image: "/HomeAssist/assets/ServiceTab3.jpg",
    basePrice: 60,
  },
  "house-cleaning": {
    title: "House Cleaning",
    description: "Professional house cleaning services",
    image: "/HomeAssist/assets/ServiceTab4.jpg",
    basePrice: 80,
  },
  "home-repairs": {
    title: "Home Repairs",
    description: "Professional home repair and maintenance services",
    image: "/HomeAssist/assets/ServiceTab5.jpg",
    basePrice: 90,
  },
  painting: {
    title: "Painting",
    description: "Professional interior and exterior painting services",
    image: "/HomeAssist/assets/ServiceTab6.jpg",
    basePrice: 100,
  },
  "outdoor-help": {
    title: "Outdoor Help",
    description: "Yard work and outdoor maintenance services",
    image: "/HomeAssist/assets/ServiceTab7.jpg",
    basePrice: 70,
  },
  "trending-services": {
    title: "Trending Services",
    description: "Popular and in-demand home services",
    image: "/HomeAssist/assets/ServiceTab8.jpg",
    basePrice: 65,
  },
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  initializeMobileMenu();

  // Set minimum date to today
  setMinimumDate();

  // Initialize service selection from URL parameters
  initializeServiceFromURL();

  // Initialize form functionality
  initializeForm();

  // Initialize pricing calculation
  initializePricing();
});

// Mobile menu functionality
function initializeMobileMenu() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navContainer = document.getElementById("nav-container");

  if (hamburgerMenu && navContainer) {
    // Toggle mobile menu when hamburger icon is clicked
    hamburgerMenu.addEventListener("click", function () {
      navContainer.classList.toggle("active");
      const spans = hamburgerMenu.querySelectorAll("span");
      spans.forEach((span) => span.classList.toggle("active"));
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener("click", function (event) {
      if (
        !hamburgerMenu.contains(event.target) &&
        !navContainer.contains(event.target)
      ) {
        navContainer.classList.remove("active");
        const spans = hamburgerMenu.querySelectorAll("span");
        spans.forEach((span) => span.classList.remove("active"));
      }
    });

    // Add click event to nav links for mobile to close menu after clicking
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navContainer.classList.remove("active");
        const spans = hamburgerMenu.querySelectorAll("span");
        spans.forEach((span) => span.classList.remove("active"));
      });
    });
  }
}

// Set minimum date to today
function setMinimumDate() {
  const dateInput = document.getElementById("serviceDate");
  if (dateInput) {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    dateInput.setAttribute("min", formattedDate);
  }
}

// Initialize service selection from URL parameters
function initializeServiceFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceType = urlParams.get("service");

  if (serviceType && serviceData[serviceType]) {
    updateServiceDetails(serviceType);

    // Pre-select service type in form
    const serviceSelect = document.getElementById("serviceType");
    if (serviceSelect) {
      serviceSelect.value = serviceType;
    }
  }
}

// Update service details on the page
function updateServiceDetails(serviceType) {
  const service = serviceData[serviceType];
  if (!service) return;

  // Update service title
  const titleElement = document.getElementById("serviceTitle");
  if (titleElement) {
    titleElement.textContent = service.title;
  }

  // Update service description
  const descriptionElement = document.getElementById("serviceDescription");
  if (descriptionElement) {
    descriptionElement.textContent = service.description;
  }

  // Update service image
  const imageElement = document.getElementById("serviceImage");
  if (imageElement) {
    imageElement.src = service.image;
    imageElement.alt = service.title;
  }

  // Update pricing
  updatePricing(service.basePrice);
}

// Initialize form functionality
function initializeForm() {
  const form = document.getElementById("bookingForm");
  const serviceTypeSelect = document.getElementById("serviceType");

  // Handle service type changes
  if (serviceTypeSelect) {
    serviceTypeSelect.addEventListener("change", function () {
      const selectedService = this.value;
      if (selectedService && serviceData[selectedService]) {
        updateServiceDetails(selectedService);
      }
    });
  }

  // Handle form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission();
    });
  }

  // Add real-time validation
  const requiredInputs = form.querySelectorAll(
    "input[required], select[required]"
  );
  requiredInputs.forEach((input) => {
    input.addEventListener("blur", validateInput);
    input.addEventListener("input", validateInput);
  });
}

// Initialize pricing calculation
function initializePricing() {
  // Set default pricing
  updatePricing(50);
}

// Update pricing display
function updatePricing(basePrice = 50) {
  const serviceFee = basePrice * 0.15;
  const total = basePrice + serviceFee;

  const basePriceElement = document.getElementById("basePrice");
  const serviceFeeElement = document.getElementById("serviceFee");
  const totalPriceElement = document.getElementById("totalPrice");

  if (basePriceElement) {
    basePriceElement.textContent = `$${basePrice.toFixed(2)}`;
  }

  if (serviceFeeElement) {
    serviceFeeElement.textContent = `$${serviceFee.toFixed(2)}`;
  }

  if (totalPriceElement) {
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Validate individual input
function validateInput(event) {
  const input = event.target;
  const value = input.value.trim();

  // Remove previous validation classes
  input.classList.remove("error", "valid");

  // Check if required field is empty
  if (input.hasAttribute("required") && !value) {
    input.classList.add("error");
    return false;
  }

  // Email validation
  if (input.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      input.classList.add("error");
      return false;
    }
  }

  // Phone validation
  if (input.type === "tel" && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      input.classList.add("error");
      return false;
    }
  }

  // ZIP code validation
  if (input.id === "zipCode" && value) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(value)) {
      input.classList.add("error");
      return false;
    }
  }

  input.classList.add("valid");
  return true;
}

// Validate entire form
function validateForm() {
  const form = document.getElementById("bookingForm");
  const requiredInputs = form.querySelectorAll(
    "input[required], select[required]"
  );
  let isValid = true;

  requiredInputs.forEach((input) => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });

  return isValid;
}

// Handle form submission
function handleFormSubmission() {
  const submitBtn = document.querySelector(".submit-btn");

  // Validate form before submission
  if (!validateForm()) {
    showNotification("Please fill in all required fields correctly.", "error");
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.textContent = "";

  // Collect form data
  const formData = collectFormData();

  // Simulate API call
  setTimeout(() => {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.textContent = "Book Service Now";

    // Show success message
    showSuccessMessage(formData);
  }, 2000);
}

// Collect form data
function collectFormData() {
  const form = document.getElementById("bookingForm");
  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}

// Show success message
function showSuccessMessage(formData) {
  const serviceType = document.getElementById("serviceType").value;
  const service = serviceData[serviceType];
  const serviceName = service ? service.title : "Service";

  const message = `
    <div class="success-message">
      <h3>Booking Confirmed!</h3>
      <p>Thank you, ${formData.firstName}! Your ${serviceName} booking has been confirmed.</p>
      <p><strong>Date:</strong> ${formData.serviceDate}</p>
      <p><strong>Time:</strong> ${formData.serviceTime}</p>
      <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</p>
      <p>You will receive a confirmation email at ${formData.email} shortly.</p>
      <button onclick="location.href='/HomeAssist/homepage.html'" class="back-home-btn">Back to Home</button>
    </div>
  `;

  // Replace form with success message
  const bookingForm = document.querySelector(".booking-form");
  bookingForm.innerHTML = message;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: ${type === "error" ? "#ef4444" : "#10b981"};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;

  // Add animation keyframes
  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .success-message {
        text-align: center;
        padding: 40px;
      }
      .success-message h3 {
        color: #10b981;
        font-size: 2rem;
        margin-bottom: 20px;
      }
      .success-message p {
        margin-bottom: 10px;
        color: #6b7280;
      }
      .back-home-btn {
        background: #7c3aed;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        transition: background-color 0.3s;
      }
      .back-home-btn:hover {
        background: #6d28d9;
      }
    `;
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(notification);

  // Handle close button
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Format phone number as user types
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
      }
      e.target.value = value;
    });
  }
});

// Auto-fill city and state based on ZIP code (basic implementation)
document.addEventListener("DOMContentLoaded", function () {
  const zipInput = document.getElementById("zipCode");
  if (zipInput) {
    zipInput.addEventListener("blur", function (e) {
      const zip = e.target.value.trim();
      if (zip.length === 5) {
        // This is a simplified implementation
        // In a real application, you would use a ZIP code API
        const cityInput = document.getElementById("city");
        const stateInput = document.getElementById("state");

        // Example ZIP code mappings (you would use a real API)
        const zipMappings = {
          10001: { city: "New York", state: "NY" },
          90210: { city: "Beverly Hills", state: "CA" },
          60601: { city: "Chicago", state: "IL" },
          77001: { city: "Houston", state: "TX" },
        };

        if (zipMappings[zip]) {
          if (cityInput && !cityInput.value) {
            cityInput.value = zipMappings[zip].city;
          }
          if (stateInput && !stateInput.value) {
            stateInput.value = zipMappings[zip].state;
          }
        }
      }
    });
  }
});
