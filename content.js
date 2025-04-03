async function checkIBAN() {
    if (window.location.protocol === "chrome:") {
        console.warn("🚫 No se puede analizar esta página:", window.location.href);
        return;
    }

    let textPage = document.body.innerText;
    let ibanFormat = /\b[A-Z]{2}[0-9]{2}([ ]?[A-Z0-9]{1,4}){1,7}\b/g;
    let ibanFound = textPage.match(ibanFormat) || [];

    console.log("🔎 IBANs found:", ibanFound);

    if (ibanFound.length > 0) {
        chrome.runtime.sendMessage({ type: "IBAN_FOUND", ibans: ibanFound });
    }
}

setTimeout(checkIBAN, 1000);




