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
            listItem.textContent = iban;
         
            if (ibanJson.includes(iban)) {
                listItem.style.color = "red";
            } else {
                listItem.style.color = "green";
            }

            ibanList.appendChild(listItem);
        });
    });
});

