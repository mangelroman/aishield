const bannedKeywords = ["spam", "phishing", "malware"];
const restrictedDomains = ["https://chat.openai.com", "https://imagic.ai"];

function isRestrictedDomain() {
  const currentDomain = window.location.origin;
  return restrictedDomains.includes(currentDomain);
}

function containsConfidentialInfo(text) {
  // Define the patterns to check for confidential information
  const patterns = [
    /\b\d{3}-\d{2}-\d{4}\b/g, // Social Security Number (SSN)
    /\b\d{13,19}\b/g, // Credit card
    /\bMiguel\b/g,
    // Add more patterns as needed
  ];

  return patterns.some((pattern) => pattern.test(text));
}

function hasBannedKeyword(text) {
  return bannedKeywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()));
}

function createBlocker(form) {
  return (event) => {
    if (isRestrictedDomain()) {
      const formElements = form.elements;
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          if (hasBannedKeyword(element.value)) {
            event.preventDefault();
            alert("Your submission contains banned keywords. Please remove them before submitting.");
            return;
          }
        }
      }
    }
  }
}

function init() {
  const forms = document.querySelectorAll('form');

  for (const form of forms) {
    buttons = form.querySelectorAll('button')
    for (const button of buttons) {
      form.addEventListener('click', createBlocker(form));
    }
  }
}

init();