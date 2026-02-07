function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const translatedText = chrome.i18n.getMessage(key) || element.textContent;
      element.textContent = translatedText;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (chrome && chrome.i18n) {
    translatePage();
  }
});