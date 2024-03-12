document.addEventListener("DOMContentLoaded", function () {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const odysseyCode = urlParams.get("id");

    // Fetch the JSON file
    fetch("../data.json")
        .then((response) => response.json())
        .then((jsonData) => {
            // Find the entry in the JSON data that matches the provided odyssey code
            const matchingEntry = jsonData.find(
                (entry) => entry.code === odysseyCode
            );

            if (matchingEntry) {
                // Update the text in the "name-element"

                const generalHeader = document.getElementById("general-header");
                generalHeader.classList.add("hidden");

                const nameElement = document.getElementById("name-element");
                nameElement.textContent = `${matchingEntry.name} of ${matchingEntry.dept} Department`;

                const headerNameElement = document.getElementById(
                    "header-name-element"
                );
                headerNameElement.textContent = `${matchingEntry.name} of ${matchingEntry.dept} Department`;

                const certHeader = document.getElementById("cert-header");
                const certificate = document.getElementById("certificate");

                certHeader.classList.remove("hidden");
                certificate.classList.remove("hidden");

                const qrContainer = document.getElementById("qr-container");

                // Use qrcode library to generate the QR code
                const qr = new QRCode(qrContainer, {
                    text:
                        "https://saikiranmatta.github.io/verify24/?odyssey=" +
                        matchingEntry.code,
                    width: 98,
                    height: 98,
                    typeNumber: 8,
                    correctLevel: QRCode.CorrectLevel.H,
                });
            } else {
                // Handle the case where no matching entry is found
                console.error(
                    "No matching entry found for the provided odyssey code."
                );
            }
        })
        .catch((error) => console.error("Error loading JSON:", error));
});
