window.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Couldn't load Data");
      }
      return response.json();
    })
    .then((data) => {
      const container = document.querySelector(".elements");

      data.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("extension-item");
        
        element.classList.add(item.isActive ? "active" : "inactive");

        element.innerHTML = `
          <div class="extension-container">
            <img src="${item.logo}" alt="${item.name} Logo" class="extension-logo" />
            <div class="extension-info">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="toggles">
                <button class="remove">Remove</button>
                <label class="toggle-switch" aria-label="Toggle ${item.name} active status">
                  <input type="checkbox" class="status-toggle" ${item.isActive ? "checked" : ""}>
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        `;


        const toggle = element.querySelector('.status-toggle');
        toggle.addEventListener('change', (e) => {
          element.classList.toggle("active", e.target.checked);
          element.classList.toggle("inactive", !e.target.checked);
        });

        container.appendChild(element);
      });
    })
    .catch((error) => {
      console.error("Loading Error", error);
    });
});
// Filter-Funktion
function filterItems(status) {
  const items = document.querySelectorAll(".extension-item");
  items.forEach(item => {
    if (status === "all") {
      item.style.display = "block";
    } else if (status === "active") {
      item.style.display = item.classList.contains("active") ? "block" : "none";
    } else if (status === "inactive") {
      item.style.display = item.classList.contains("inactive") ? "block" : "none";
    }
  });
}

// Navigation-Buttons verbinden
const navButtons = document.querySelectorAll("nav li");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.textContent.toLowerCase(); // "all", "active", "inactive"
    filterItems(label);
  });
});

//Dark light mode toggle
const colorButton = document.querySelector(".colorscheme");

// Beim Klick: Toggle-Modus
colorButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Optional speichern im localStorage
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Beim Laden: Theme aus localStorage laden
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

