chrome.runtime.onInstalled.addListener(function() {
  showQuranVerseNotification();
  
  // Schedule recurring Quran verse notifications using alarms
  chrome.alarms.create("quranVerseAlarm", {
    delayInMinutes: 60, // First alarm after 1 hour
    periodInMinutes: 60 // Repeat every hour
  });
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "quranVerseAlarm") {
    showQuranVerseNotification();
  } else if (alarm.name.startsWith("prayer_")) {
    showPrayerNotification(alarm.name);
  }
});

function showQuranVerseNotification() {
  const quranVerses = [
    { text: "Indeed, prayer has been decreed upon the believers a decree of specified times.", surah: "An-Nisa (4:103)" },
    { text: "And establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater. And Allah knows that which you do.", surah: "Al-'Ankabut (29:45)" },
    { text: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.", surah: "Al-Baqarah (2:153)" },
    { text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.", surah: "Al-Baqarah (2:152)" },
    { text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah fulfills His purposes.", surah: "At-Talaq (65:3)" },
    { text: "Indeed, Allah does not change the condition of a people until they change what is in themselves.", surah: "Ar-Ra'd (13:11)" },
    { text: "And We send down of the Qur'an that which is healing and mercy for the believers.", surah: "Al-Isra (17:82)" },
    { text: "So be patient. Indeed, the promise of Allah is truth.", surah: "Ar-Rum (30:60)" },
    { text: "And whoever fears Allah - He will make for him a way out", surah: "At-Talaq (65:2)" },
    { text: "And Allah presents an example: a city that was safe and secure, its provision coming to it in abundance from every location, but it denied the favors of Allah...", surah: "An-Nahl (16:112)" }
  ];
  
  const randomVerse = quranVerses[Math.floor(Math.random() * quranVerses.length)];
  
  chrome.notifications.create({
    type: 'basic',
    title: chrome.i18n.getMessage('quranVerseNotificationTitle') || 'Quran Verse of the Hour',
    message: `${randomVerse.text} - ${randomVerse.surah}`,
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    priority: 0
  });
}

function showPrayerNotification(alarmName) {
  const prayerName = alarmName.split('_')[1];
  const prayerNames = {
    'fajr': chrome.i18n.getMessage('fajr') || 'Fajr',
    'dhuhr': chrome.i18n.getMessage('dhuhr') || 'Dhuhr',
    'asr': chrome.i18n.getMessage('asr') || 'Asr',
    'maghrib': chrome.i18n.getMessage('maghrib') || 'Maghrib',
    'isha': chrome.i18n.getMessage('isha') || 'Isha'
  };
  
  const prayerDisplayName = prayerNames[prayerName] || prayerName;
  
  chrome.notifications.create({
    type: 'basic',
    title: `${prayerDisplayName} Prayer Time`,
    message: `It is time for ${prayerDisplayName} prayer. 5 minutes remaining.`,
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    priority: 2
  });
}

chrome.tabs.onCreated.addListener(function(tab) {
});