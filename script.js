document.addEventListener("DOMContentLoaded", function () {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const odysseyCode = urlParams.get("odyssey");

    // Fetch the JSON file
    fetch("data.json")
        .then((response) => response.json())
        .then((jsonData) => {
            // Find the entry in the JSON data that matches the provided odyssey code
            const matchingEntry = jsonData.find(
                (entry) => entry.code === odysseyCode
            );

            if (matchingEntry) {
                // Update the text in the "name-element"
                const nameElement = document.getElementById("name-element");
                nameElement.textContent = `${matchingEntry.name} of ${matchingEntry.dept}`;

                // Example: Update SVG content based on the matching entry
            } else {
                // Handle the case where no matching entry is found
                console.error(
                    "No matching entry found for the provided odyssey code."
                );
            }
        })
        .catch((error) => console.error("Error loading JSON:", error));
});
