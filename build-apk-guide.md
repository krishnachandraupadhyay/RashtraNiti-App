# 📱 राष्ट्रनीति (RashtraNiti) - APK जनरेट करने के तरीके

आपके प्रोजेक्ट में पूरा **Native Android Project** (`android/` फोल्डर) तैयार कर दिया गया है। 

---

### तरीका 1: PWABuilder (1-Click - सबसे आसान और तेज़)
1. आपका गेम PWA (Progressive Web App) रेडी है।
2. [PWABuilder.com](https://www.pwabuilder.com/) पर जाएं।
3. अपने ऐप का लिंक या लोकलहोस्ट डालें और **"Generate Android APK"** पर क्लिक करें।
4. आपको तुरंत आपके फ़ोन के लिए रेडी-टू-इंस्टॉल **.apk** फ़ाइल डाउनलोड मिल जाएगी!

---

### तरीका 2: GitHub Actions (Free Automated Cloud Build)
1. मैंने इस प्रोजेक्ट में `.github/workflows/build-apk.yml` सेटअप कर दिया है।
2. इस कोड को GitHub रिपॉजिटरी में पुश करें।
3. GitHub का Cloud Server 2 मिनट में अपने आप `.apk` बिल्ड कर देगा और आपको सीधे डाउनलोड लिंक (Artifact) दे देगा!

---

### तरीका 3: अपने PC पर Android Studio से लोकल बिल्ड
1. [Android Studio](https://developer.android.com/studio) डाउनलोड और इंस्टॉल करें।
2. Android Studio खोलकर इस प्रोजेक्ट के `android/` फोल्डर को ओपन करें।
3. ऊपर मेनू में **Build > Build Bundle(s) / APK(s) > Build APK(s)** पर क्लिक करें।
4. आपका APK यहाँ मिल जाएगा:
   `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 3: Build APK via Command Line or Android Studio
- **Option A (Via Android Studio GUI)**:
  ```bash
  npx cap open android
  ```
  In Android Studio: Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
  Your `.apk` file will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`!

- **Option B (Direct Gradle Command Line without opening Studio)**:
  ```bash
  cd android
  ./gradlew assembleDebug
  ```
  The ready-to-install `app-debug.apk` will be output to:
  `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🌟 Game Highlights
- **100% Fictional Simulation**: No real politician names, voices, or faces.
- **Procedural Prime Minister Avatar + Photo Upload**: Secure, client-side only.
- **9-Sector Annual Budget Engine**: Education, Healthcare, Defence, Agriculture, Infrastructure, Employment, Tech, Environment, Social Welfare.
- **Parliament & Politics**: 543 Lok Sabha seats, party alignments, vote counts.
- **Dynamic Events & Crises**: 40+ multi-choice branching narrative dilemmas.
- **5-Year Democratic Elections**: Live seat count tally with 272 majority threshold.
- **The Rashtra Times**: Annual front-page debrief with GDP, Inflation, and Approval scorecards.
