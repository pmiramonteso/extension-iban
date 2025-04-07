document.addEventListener("DOMContentLoaded", async () => {
    let ibanList = document.getElementById("iban-list");

    chrome.storage.local.get("ibans", async (data) => {
        let ibans = data.ibans || [];
        ibanList.innerHTML = "";

        if (ibans.length === 0) {
            ibanList.innerHTML = "<li>No se encontraron IBANs.</li>";
            return;
        }

        let ibanJson = await fetch(chrome.runtime.getURL("iban.json"))
            .then(response => response.json())
            .then(json => json.ibans)
            .catch(() => []);

        ibans.forEach(iban => {
            let listItem = document.createElement("li");

            let statusIcon = document.createElement("span");
            statusIcon.classList.add("status-icon");

         
            if (ibanJson.includes(iban)) {
                statusIcon.classList.add("green");
            } else {
                statusIcon.classList.add("red");
            }

            listItem.appendChild(document.createTextNode(iban));
            listItem.appendChild(statusIcon);
            ibanList.appendChild(listItem);
        });
    });
});

