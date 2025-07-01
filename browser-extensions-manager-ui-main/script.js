
  window.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Daten konnten nicht geladen werden");
        }
        return response.json();
      })
      .then((data) => {
        const container = document.querySelector(".elements");

        data.forEach((item) => {
          const element = document.createElement("div");
          element.classList.add("extension-item");

          element.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="${item.status}">${item.status}</span>
          `;

          container.appendChild(element);
        });
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Daten:", error);
      });
  });
