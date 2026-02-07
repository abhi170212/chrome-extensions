document.addEventListener('DOMContentLoaded', function() {
  // Load Quran verse when popup opens
  loadQuranVerse();
  
  function setPrayerAlarm(prayerTime, prayerName) {
    const alarmTime = calculateAlarmTime(prayerTime);
    const alarmName = `prayer_${prayerName}_${Date.now()}`;
    
    chrome.alarms.create(alarmName, {
      when: alarmTime.getTime()
    });
    
    alert(`${chrome.i18n.getMessage(prayerName) || prayerName} alarm set for ${formatTime(alarmTime)}`);
  }

  function calculateAlarmTime(prayerTimeStr) {
    const now = new Date();
    const [time, period] = prayerTimeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let prayerHours = hours;
    if (period === 'PM' && hours !== 12) {
      prayerHours += 12;
    } else if (period === 'AM' && hours === 12) {
      prayerHours = 0;
    }
    
    const alarmTime = new Date();
    alarmTime.setHours(prayerHours, minutes, 0, 0);
    
    // Subtract 5 minutes for early notification
    alarmTime.setMinutes(alarmTime.getMinutes() - 5);
    
    // If the alarm time is in the past, set it for tomorrow
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
    
    return alarmTime;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function loadQuranVerse() {
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
    
    document.getElementById('verseText').textContent = randomVerse.text;
    document.getElementById('verseSurah').textContent = `— ${randomVerse.surah}`;
  }

  const countrySelect = document.getElementById('country');
  const getPrayerTimesBtn = document.getElementById('getPrayerTimes');
  const prayerContainer = document.getElementById('prayerContainer');
  const prayerTimesList = document.getElementById('prayerTimesList');
  
  const prayerTimesData = {
    'SA': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '04:00 PM',
      maghrib: '06:30 PM',
      isha: '08:00 PM'
    },
    'IN': {
      fajr: '05:00 AM',
      sunrise: '06:30 AM',
      dhuhr: '12:45 PM',
      asr: '04:15 PM',
      maghrib: '06:15 PM',
      isha: '07:45 PM'
    },
    'US': {
      fajr: '05:30 AM',
      sunrise: '07:00 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '6:00 PM',
      isha: '7:30 PM'
    },
    'GB': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '1:00 PM',
      asr: '4:45 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'DE': {
      fajr: '04:30 AM',
      sunrise: '6:00 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'FR': {
      fajr: '05:00 AM',
      sunrise: '6:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:45 PM',
      maghrib: '6:00 PM',
      isha: '7:30 PM'
    },
    'EG': {
      fajr: '04:45 AM',
      sunrise: '6:15 AM',
      dhuhr: '12:30 PM',
      asr: '3:45 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'ID': {
      fajr: '04:00 AM',
      sunrise: '5:30 AM',
      dhuhr: '12:00 PM',
      asr: '3:30 PM',
      maghrib: '5:45 PM',
      isha: '7:00 PM'
    },
    'MY': {
      fajr: '05:45 AM',
      sunrise: '7:00 AM',
      dhuhr: '1:15 PM',
      asr: '4:45 PM',
      maghrib: '7:00 PM',
      isha: '8:30 PM'
    },
    'PK': {
      fajr: '04:45 AM',
      sunrise: '6:15 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'CA': {
      fajr: '05:15 AM',
      sunrise: '06:45 AM',
      dhuhr: '1:15 PM',
      asr: '4:45 PM',
      maghrib: '6:15 PM',
      isha: '7:45 PM'
    },
    'AU': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '12:45 PM',
      asr: '4:15 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'TR': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'BD': {
      fajr: '04:15 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '3:45 PM',
      maghrib: '5:15 PM',
      isha: '6:45 PM'
    },
    'NG': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '12:30 PM',
      asr: '3:45 PM',
      maghrib: '6:00 PM',
      isha: '7:30 PM'
    },
    'IR': {
      fajr: '04:15 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '3:45 PM',
      maghrib: '5:15 PM',
      isha: '6:45 PM'
    },
    'AF': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'SD': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '12:30 PM',
      asr: '3:45 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'YE': {
      fajr: '04:15 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '3:45 PM',
      maghrib: '5:15 PM',
      isha: '6:45 PM'
    },
    'SY': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'DZ': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '12:30 PM',
      asr: '3:45 PM',
      maghrib: '5:45 PM',
      isha: '7:15 PM'
    },
    'TN': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'MA': {
      fajr: '05:00 AM',
      sunrise: '06:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '6:00 PM',
      isha: '7:30 PM'
    },
    'ES': {
      fajr: '05:15 AM',
      sunrise: '06:45 AM',
      dhuhr: '1:15 PM',
      asr: '4:45 PM',
      maghrib: '6:15 PM',
      isha: '7:45 PM'
    },
    'IQ': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'JO': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'KW': {
      fajr: '04:15 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '3:45 PM',
      maghrib: '5:15 PM',
      isha: '6:45 PM'
    },
    'LB': {
      fajr: '04:45 AM',
      sunrise: '06:15 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'PS': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    },
    'QA': {
      fajr: '04:15 AM',
      sunrise: '05:45 AM',
      dhuhr: '12:15 PM',
      asr: '3:45 PM',
      maghrib: '5:15 PM',
      isha: '6:45 PM'
    },
    'AE': {
      fajr: '04:30 AM',
      sunrise: '06:00 AM',
      dhuhr: '12:30 PM',
      asr: '4:00 PM',
      maghrib: '5:30 PM',
      isha: '7:00 PM'
    }
  };
  
  getPrayerTimesBtn.addEventListener('click', function() {
    const selectedCountry = countrySelect.value;
    
    if (!selectedCountry) {
      alert('Please select a country');
      return;
    }
    
    const times = prayerTimesData[selectedCountry];
    if (times) {
      prayerTimesList.innerHTML = `
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('fajr') || 'Fajr'}:</strong> ${times.fajr} <button class="set-alarm-btn" data-time="${times.fajr}" data-prayer="fajr">Set Alarm</button></div>
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('sunrise') || 'Sunrise'}:</strong> ${times.sunrise}</div>
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('dhuhr') || 'Dhuhr'}:</strong> ${times.dhuhr} <button class="set-alarm-btn" data-time="${times.dhuhr}" data-prayer="dhuhr">Set Alarm</button></div>
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('asr') || 'Asr'}:</strong> ${times.asr} <button class="set-alarm-btn" data-time="${times.asr}" data-prayer="asr">Set Alarm</button></div>
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('maghrib') || 'Maghrib'}:</strong> ${times.maghrib} <button class="set-alarm-btn" data-time="${times.maghrib}" data-prayer="maghrib">Set Alarm</button></div>
        <div class="prayer-item"><strong>${chrome.i18n.getMessage('isha') || 'Isha'}:</strong> ${times.isha} <button class="set-alarm-btn" data-time="${times.isha}" data-prayer="isha">Set Alarm</button></div>
      `;
      prayerContainer.style.display = 'block';
      
      // Add event listeners for alarm buttons
      document.querySelectorAll('.set-alarm-btn').forEach(button => {
        button.addEventListener('click', function() {
          const prayerTime = this.getAttribute('data-time');
          const prayerName = this.getAttribute('data-prayer');
          setPrayerAlarm(prayerTime, prayerName);
        });
      });
    } else {
      alert('Prayer times not available for this country');
    }
    
    // Show calendar section after getting prayer times
    document.getElementById('calendarSection').style.display = 'block';
    
    // Initialize Islamic calendar
    initializeIslamicCalendar();
  });
  
  // Initialize Islamic calendar
  function initializeIslamicCalendar() {
    displayIslamicDate();
    
    // Add event listener for the calendar info button
    document.getElementById('showCalendarInfo').addEventListener('click', function() {
      const calendarInfo = document.getElementById('calendarInfo');
      if (calendarInfo.style.display === 'none' || calendarInfo.style.display === '') {
        calendarInfo.style.display = 'block';
        this.textContent = 'Hide Calendar Info';
      } else {
        calendarInfo.style.display = 'none';
        this.textContent = 'About Islamic Calendar';
      }
    });
  }
  
  function displayIslamicDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', options);
    
    // Simple conversion to approximate Hijri date (this is a simplified algorithm)
    const hijriDate = getApproximateHijriDate(now);
    
    document.getElementById('currentDate').textContent = currentDate;
    document.getElementById('islamicDate').textContent = `Islamic Date: ${hijriDate.day} ${hijriDate.month} ${hijriDate.year} AH`;
    document.getElementById('hijriDate').textContent = `Hijri: ${hijriDate.hijriDay} ${hijriDate.hijriMonth} ${hijriDate.hijriYear}`;
  }
  
  function getApproximateHijriDate(gregorianDate) {
    // This is a simplified approximation of converting Gregorian to Hijri date
    // Real conversion requires complex astronomical calculations
    
    // Approximate calculation: Hijri year ≈ (Gregorian year - 622) * 0.97
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth();
    const gDay = gregorianDate.getDate();
    
    // Simplified conversion formula (approximate)
    const julianDay = gregorianToJulian(gYear, gMonth + 1, gDay);
    const hijri = julianToHijri(julianDay - 1948439); // Offset from Hijra (622 CE)
    
    const hijriMonths = ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 
                         'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 
                         'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
    
    return {
      day: hijri.day,
      month: hijriMonths[hijri.month - 1],
      year: hijri.year,
      hijriDay: hijri.day,
      hijriMonth: hijriMonths[hijri.month - 1],
      hijriYear: hijri.year
    };
  }
  
  function gregorianToJulian(year, month, day) {
    // Convert Gregorian date to Julian Day Number
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    return Math.floor(365.25 * (year + 4716)) + 
           Math.floor(30.6001 * (month + 1)) + 
           day + b - 1524;
  }
  
  function julianToHijri(days) {
    // Convert Julian Day difference to Hijri date
    const hijriYear = Math.floor((days - 1) / 354) + 1;
    const remainingDays = (days - 1) % 354;
    const hijriMonth = Math.floor(remainingDays / 29) + 1;
    const hijriDay = (remainingDays % 29) + 1;
    
    return {
      year: hijriYear,
      month: hijriMonth,
      day: hijriDay
    };
  }
});