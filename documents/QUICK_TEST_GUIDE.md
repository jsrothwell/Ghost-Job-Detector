# Quick Testing Guide - Ghost Job Detector

## 🚀 Test the Extension in 5 Minutes

Follow these steps to verify the extension works correctly.

---

## ✅ Pre-Test Checklist

- [ ] Extension installed and enabled in `chrome://extensions/`
- [ ] Using v2.2-debug version (with console logging)
- [ ] Browser console open (F12 → Console tab)
- [ ] On Indeed job posting page (NOT search results)

---

## 🧪 Test 1: Flagged Company (Should Show RED Warning)

### Steps:
1. **Go to Indeed.com**
2. **In search box, type:** `Accenture software engineer`
3. **Click "Find jobs" button**
4. **Click on ANY Accenture job title** in the results
5. **Wait 1-3 seconds**

### Expected Result:
```
🚨 RED WARNING BANNER AT TOP OF PAGE
```

### Console Output Should Show:
```
[Ghost Job Detector] ✅ Detected company: Accenture
[Ghost Job Detector] 🚨 MATCH FOUND! Ghost job company detected: Accenture
```

### If You See This:
✅ **Extension is working!**

### If You DON'T See This:
❌ **Problem detected** - Check troubleshooting guide

---

## 🧪 Test 2: Good Company with Fresh Job (Should Show GREEN Banner)

### Steps:
1. **Go to Indeed.com**
2. **Search for:** `Google software engineer`
3. **Sort by:** "Date" (to get recent jobs)
4. **Click on a Google job posted within last week**
5. **Wait 1-3 seconds**

### Expected Result:
```
👍 GREEN "LOOKING GOOD" BANNER AT TOP
```

### Console Output Should Show:
```
[Ghost Job Detector] ✅ Detected company: Google
[Ghost Job Detector] ✅ Company not flagged for ghost jobs
[Ghost Job Detector] 📅 Job age: Posted 3 days ago
```

### If Banner Auto-Dismisses After 8 Seconds:
✅ **Positive indicator working correctly!**

---

## 🧪 Test 3: Neutral Case (Should Show NO Banner)

### Steps:
1. **Go to Indeed.com**
2. **Search for:** `Microsoft engineer`
3. **Click on older Microsoft job (30+ days)**
4. **Wait 1-3 seconds**

### Expected Result:
```
⚪ NO BANNER (neutral)
```

### Console Output Should Show:
```
[Ghost Job Detector] ✅ Detected company: Microsoft
[Ghost Job Detector] ✅ Company not flagged for ghost jobs
[Ghost Job Detector] 📅 Job age: 45 days (or unknown)
```

### This is Normal:
✅ Company not flagged + job not fresh = no banner

---

## 🧪 Test 4: Verify Console Logging

### What Good Console Output Looks Like:

```
[Ghost Job Detector] 🔍 Starting ghost job check...
[Ghost Job Detector] Current URL: https://www.indeed.com/viewjob?jk=abc123
[Ghost Job Detector] Page title: Software Engineer - Accenture - Indeed
[Ghost Job Detector] Attempting to extract company name from: indeed.com
[Ghost Job Detector] 🔍 Trying Indeed selectors...
[Ghost Job Detector] ✅ Found company via selector: [data-testid="companyName"] → Accenture
[Ghost Job Detector] ✅ Detected company: Accenture
[Ghost Job Detector] 📅 Job age: Posted 2 months ago (60 days)
[Ghost Job Detector] 🔍 Checking if company is on ghost job list...
[Ghost Job Detector] Total tracked companies: 47
[Ghost Job Detector] 🚨 MATCH FOUND! Ghost job company detected: Accenture
```

### If You See This:
✅ Everything working perfectly!

### What Bad Console Output Looks Like:

```
[Ghost Job Detector] ❌ Could not extract company name from page
[Ghost Job Detector] ❌ Selector not found: [data-testid="companyName"]
[Ghost Job Detector] ❌ Selector not found: ...
[Ghost Job Detector] 🔄 Will retry in 2 seconds...
```

### If You See This:
❌ Company name extraction failing - see troubleshooting guide

---

## 🧪 Test 5: Check Extension Popup

### Steps:
1. **Click the extension icon** (👻) in Chrome toolbar
2. **Look at statistics:**
   - Companies Tracked: Should be 13+ (default)
   - Warnings Shown: Increases when you see red banners
   - Last Updated: Should be recent

3. **Check tracked companies list:**
   - Scroll down to "Tracked Companies"
   - Search for "Accenture" 
   - Should be in the alphabetical list

### Expected:
✅ See company statistics and list

---

## 🧪 Test 6: Test Different Job Sites

### LinkedIn Test:
```
1. Go to LinkedIn.com/jobs
2. Search "Accenture"
3. Click any job
4. Should see RED warning
```

### Glassdoor Test:
```
1. Go to Glassdoor.com
2. Search jobs for "CVS Health"
3. Click any job
4. Should see RED warning
```

### All Sites Working?
✅ Extension fully functional!

---

## 🔧 Common Test Failures & Fixes

### Failure: No Console Messages at All

**Cause:** Extension not loaded

**Fix:**
1. Go to `chrome://extensions/`
2. Find Ghost Job Detector
3. Click refresh icon
4. Reload Indeed page

---

### Failure: Console Shows "Could not extract company name"

**Cause:** Indeed changed HTML or wrong page type

**Fix:**
1. Make sure you're on a JOB POSTING (not search results)
2. URL should be `indeed.com/viewjob?jk=...`
3. Wait 5 seconds for retry
4. If still fails, report the specific URL

---

### Failure: Company Detected but No Banner

**Cause:** Company not in tracked list

**Fix:**
1. Click extension icon
2. Manually add the company
3. Or click "Update Database"
4. Refresh page

---

### Failure: Wrong Company Detected

**Cause:** Selector picking up wrong element

**Fix:**
1. Note the exact Indeed URL
2. Note what company should be vs what was detected
3. Report this so selectors can be fixed

---

## 📊 Success Criteria

**All Tests Should Pass:**
- ✅ Test 1: Red banner on Accenture job
- ✅ Test 2: Green banner on fresh Google job  
- ✅ Test 3: No banner on old Microsoft job
- ✅ Test 4: Console shows detailed logs
- ✅ Test 5: Popup shows statistics and companies
- ✅ Test 6: Works on multiple job sites

**If all tests pass:** 🎉 Extension working perfectly!

**If any test fails:** 📋 See full troubleshooting guide

---

## 🎯 Quick Debug Commands

### Check if selector exists:
```javascript
document.querySelector('[data-testid="companyName"]')
```

### Get company name manually:
```javascript
document.querySelector('[data-testid="companyName"]')?.textContent
```

### Check tracked companies:
```javascript
chrome.storage.local.get(['ghostJobCompanies'], (r) => console.log(r))
```

### Reload extension:
```
chrome://extensions/ → Click refresh icon
```

---

## 📱 Mobile Testing

### Indeed Mobile (m.indeed.com):
Should also work on mobile URLs:
- `m.indeed.com/viewjob?jk=...`

Test on mobile Chrome:
1. Enable extension
2. Visit mobile Indeed job
3. Should see banners (may be narrower)

---

## ⏱️ Timing Guide

| Event | Expected Time |
|-------|---------------|
| Page load to extension start | 1 second |
| Company detection | 0-2 seconds |
| Banner appears | 1-3 seconds total |
| Green banner auto-dismiss | 8 seconds |
| Retry if no company found | 2 seconds |

**Total:** Red banner should appear within 3 seconds of page load.

---

## 🆘 If All Tests Fail

1. **Uninstall completely**
2. **Clear browser cache**
3. **Download fresh v2.2-debug.zip**
4. **Install as unpacked extension**
5. **Test again**

Still failing?
- Check Chrome version (needs 88+)
- Check for conflicting extensions
- Try incognito mode
- Report issue with console output

---

## ✅ Ready to Use!

If you've passed the tests:
- Extension is working correctly
- You can browse jobs with confidence
- Red banners = caution needed
- Green banners = positive sign
- No banner = neutral, do research

**Happy (and safe) job hunting!** 👻🚫

**Quick Test Guide v2.2 | November 2025**
