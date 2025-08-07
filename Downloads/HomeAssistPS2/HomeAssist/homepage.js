// Get all service elements, the selected line, the service options container, and the info card elements
const services = document.querySelectorAll(".service");
const selectedLine = document.querySelector(".selected-line");
const serviceOptions = document.getElementById("service-options");
const infoCard = document.getElementById("info-card");
const infoTitle = document.getElementById("info-title");
const infoList = document.getElementById("info-list");
const infoImg = document.getElementById("info-img");

// Define service options and info card data for each service
const serviceData = {
  assembly: {
    options: [
      "General Furniture Assembly",
      "IKEA Assembly",
      "Crib Assembly",
      "PAX Assembly",
      "Bookshelf Assembly",
      "Desk Assembly",
    ],
    info: {
      title: "Assembly",
      list: [
        "✔ Assemble or disassemble furniture items by unboxing, building, and any cleanup.",
        "✔ Now Trending: Curved sofas, computer desks, and sustainable materials.",
      ],
      image: "/HomeAssist/assets/AssemblyImg.jpg",
    },
  },
  mounting: {
    options: [
      "TV Mounting",
      "Art & Picture Hanging",
      "Shelf Mounting",
      "Mirror Mounting",
      "Curtain Rod Installation",
    ],
    info: {
      title: "Mounting",
      list: [
        "✔ Mount TVs, artwork, shelves, and more securely to your walls.",
        "✔ Professional installation with proper tools and hardware.",
      ],
      image: "/HomeAssist/assets/Homepage_Mounting.jpg",
    },
  },
  moving: {
    options: [
      "Help Moving",
      "Loading & Unloading",
      "Heavy Lifting",
      "Furniture Rearrangement",
      "Packing Services",
    ],
    info: {
      title: "Moving",
      list: [
        "✔ Professional help with moving, loading, and heavy lifting.",
        "✔ Safe and efficient relocation services for your peace of mind.",
      ],
      image: "/HomeAssist/assets/Homepage_Moving.jpg",
    },
  },
  cleaning: {
    options: [
      "House Cleaning",
      "Deep Cleaning",
      "Move-out Cleaning",
      "Post-construction Cleanup",
      "Garage Cleaning",
    ],
    info: {
      title: "Cleaning",
      list: [
        "✔ Thorough cleaning services for homes and apartments.",
        "✔ Professional-grade equipment and eco-friendly products.",
      ],
      image: "/HomeAssist/assets/Homepage_Cleaning.jpg",
    },
  },
  "outdoor-help": {
    options: [
      "Lawn Care",
      "Gardening",
      "Snow Removal",
      "Pressure Washing",
      "Gutter Cleaning",
    ],
    info: {
      title: "Outdoor Help",
      list: [
        "✔ Comprehensive outdoor maintenance and improvement services.",
        "✔ Seasonal services to keep your property looking its best.",
      ],
      image: "/HomeAssist/assets/Homepage_Outdoor.jpg",
    },
  },
  "home-repairs": {
    options: [
      "Plumbing Repairs",
      "Electrical Work",
      "Drywall Repair",
      "Door & Window Repairs",
      "Minor Home Fixes",
    ],
    info: {
      title: "Home Repairs",
      list: [
        "✔ Quick fixes and repairs to keep your home in top condition.",
        "✔ Licensed professionals for electrical and plumbing work.",
      ],
      image: "/HomeAssist/assets/Homepage_HomeRepairs.jpg",
    },
  },
  painting: {
    options: [
      "Interior Painting",
      "Exterior Painting",
      "Touch-up Painting",
      "Accent Walls",
      "Furniture Painting",
    ],
    info: {
      title: "Painting",
      list: [
        "✔ Professional painting services for interior and exterior projects.",
        "✔ Quality paints and expert application for lasting results.",
      ],
      image: "/HomeAssist/assets/Homepage_Painting.jpg",
    },
  },
  trending: {
    options: [
      "Smart Home Setup",
      "Home Organization",
      "Holiday Decorating",
      "Event Setup",
      "Tech Support",
    ],
    info: {
      title: "Trending",
      list: [
        "✔ Popular and trending services based on current demand.",
        "✔ Stay up-to-date with the latest home improvement trends.",
      ],
      image: "/HomeAssist/assets/Homepage_Trending.jpg",
    },
  },
};

// Function to update service options
function updateServiceOptions(serviceName) {
  const data = serviceData[serviceName];
  if (data) {
    serviceOptions.innerHTML = "";
    data.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      serviceOptions.appendChild(button);
    });
  }
}

// Function to update info card
function updateInfoCard(serviceName) {
  const data = serviceData[serviceName];
  if (data) {
    infoTitle.textContent = data.info.title;
    infoList.innerHTML = "";
    data.info.list.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      infoList.appendChild(li);
    });
    infoImg.src = data.info.image;
    infoImg.alt = data.info.title;
  }
}

// Function to update selected line position
function updateSelectedLine(activeService) {
  const rect = activeService.getBoundingClientRect();
  const containerRect = activeService.parentElement.getBoundingClientRect();
  const left = rect.left - containerRect.left + rect.width / 2 - 40;
  selectedLine.style.left = `${left}px`;
}

// Add event listeners to service elements
services.forEach((service) => {
  service.addEventListener("click", () => {
    // Remove active class from all services
    services.forEach((s) => s.classList.remove("active"));

    // Add active class to clicked service
    service.classList.add("active");

    // Get service name from data attribute
    const serviceName = service.getAttribute("data-service");

    // Update service options and info card
    updateServiceOptions(serviceName);
    updateInfoCard(serviceName);

    // Update selected line position
    updateSelectedLine(service);
  });
});

// Initialize with first service (assembly)
document.addEventListener("DOMContentLoaded", () => {
  const firstService = document.querySelector(".service.active");
  if (firstService) {
    const serviceName = firstService.getAttribute("data-service");
    updateServiceOptions(serviceName);
    updateInfoCard(serviceName);
    updateSelectedLine(firstService);
  }
});

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
    });
  }
});

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (query) {
        // Redirect to services page with search query
        window.location.href = `/HomeAssist/Servicepage/index.html?search=${encodeURIComponent(
          query
        )}`;
      }
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });
  }
});
