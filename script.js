const apiKey = "QKFVjWWLOz3HGVbg68t6m8ATPq8uLLDCdApeljco"; // Replace with your NASA API key
const tipsSection = document.getElementById("stargazing-tips");
const searchButton = document.getElementById("searchButton");

// Function to fetch APOD data by user-entered date
async function fetchByDate() {
    const dateInput = document.getElementById("dateInput").value;

    if (!dateInput) {
        tipsSection.innerHTML = `<p style="color: red;">Please select a valid date!</p>`;
        return;
    }

    console.log(`Fetching data for date: ${dateInput}`); // Debugging log

    try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`
        );

        if (!response.ok) {
            console.error("Error response from NASA API:", response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Update the UI with fetched data
        if (data.media_type === "image") {
            tipsSection.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}" class="fade-in">
                <p>${data.explanation}</p>
            `;
        } else {
            tipsSection.innerHTML = `<p>No image available for this date. Try another one!</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        tipsSection.innerHTML = `<p style="color: red;">Error loading data for the selected date. Please try again later.</p>`;
    }
}

// Attach event listener to the button
searchButton.addEventListener("click", fetchByDate);

// Twinkling Stars Effect
document.addEventListener("DOMContentLoaded", function () {
    const numStars = 150;
    const body = document.body;

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.className = "stars";
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        body.appendChild(star);
    }
});
