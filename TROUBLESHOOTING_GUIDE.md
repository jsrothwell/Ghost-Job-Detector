# Ghost Job Detector - Troubleshooting Guide

## 🚨 Extension Not Showing Warnings on Indeed?

This guide will help you diagnose and fix the issue.

---

## ✅ Quick Checklist

Before diving into detailed troubleshooting:

- [ ] Are you on an actual **job posting page** (not search results)?
- [ ] Is the extension **enabled** in Chrome?
- [ ] Have you **refreshed the page** after installing?
- [ ] Are you using the **latest version** (v2.2+)?
- [ ] Have you checked the **browser console** for errors?

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Verify You're on the Right Page

**✅ Extension WORKS on these URLs:**
```
https://www.indeed.com/viewjob?jk=abc123...
https://www.indeed.com/rc/clk?jk=abc123...
https://m.indeed.com/viewjob?jk=abc123...
```

**❌ Extension DOES NOT work on these:**
```
https://www.indeed.com (homepage)
https://www.indeed.com/jobs?q=engineer (search results)
https://www.indeed.com/cmp/Accenture (company page)
https://www.indeed.com/hire (employer pages)
```

**How to get to a job posting:**
1. Go to Indeed.com
2. Search for a job (e.g., "software engineer")
3. **Click on a specific job title** in the results
4. You should now see the full job description
5. **Now** the extension should activate

---

### Step 2: Check Extension is Loaded

**Open Browser Console:**
1. Press **F12** (or Ctrl+Shift+I / Cmd+Option+I)
2. Click the **Console** tab
3. Refresh the Indeed job page
4. Look for messages starting with `[Ghost Job Detector]`

**What you should see:**
```
[Ghost Job Detector] 🔍 Starting ghost job check...
[Ghost Job Detector] Current URL: https://www.indeed.com/viewjob?jk=...
[Ghost Job Detector] Page title: Software Engineer - Accenture
[Ghost Job Detector] Attempting to extract company name from: indeed.com
[Ghost Job Detector] 🔍 Trying Indeed selectors...
[Ghost Job Detector] ✅ Found company via selector: [data-testid="companyName"] → Accenture
[Ghost Job Detector] ✅ Detected company: Accenture
[Ghost Job Detector] 🔍 Checking if company is on ghost job list...
[Ghost Job Detector] Total tracked companies: 47
[Ghost Job Detector] 🚨 MATCH FOUND! Ghost job company detected: Accenture
```

**If you see this, the extension is working!** Look for the red banner at the top of the page.

---

### Step 3: Diagnose Common Issues

#### Issue 1: No Console Messages at All

**Problem:** Extension not loaded on page

**Solutions:**
1. **Check extension is enabled:**
   - Go to `chrome://extensions/`
   - Find "Ghost Job Detector"
   - Make sure toggle is ON (blue)

2. **Check permissions:**
   - Click "Details" on the extension
   - Scroll to "Site access"
   - Should say "On specific sites" with Indeed listed

3. **Reload extension:**
   - Go to `chrome://extensions/`
   - Click the refresh icon on Ghost Job Detector
   - Refresh the Indeed page

4. **Reinstall extension:**
   - Remove old version
   - Install v2.2 debug version
   - Try again

#### Issue 2: See Messages but "Could not extract company name"

**Console shows:**
```
[Ghost Job Detector] ❌ Could not extract company name from page
[Ghost Job Detector] ❌ Selector not found: [data-testid="companyName"]
[Ghost Job Detector] ❌ Selector not found: ...
```

**Problem:** Indeed changed their HTML structure

**Solutions:**

1. **Wait longer:**
   - Indeed pages load dynamically
   - Extension retries after 2 seconds
   - Give it up to 5 seconds

2. **Report the issue:**
   - Take a screenshot of the console
   - Note the exact Indeed URL
   - Tell me so I can update selectors

3. **Manual verification:**
   - Click extension icon
   - Search for company in tracked list
   - If listed, proceed with caution

#### Issue 3: Company Name Extracted but No Warning

**Console shows:**
```
[Ghost Job Detector] ✅ Detected company: Accenture
[Ghost Job Detector] ✅ Company not flagged for ghost jobs: Accenture
```

**Problem:** Company not in your tracked list

**Solutions:**

1. **Check your tracked companies:**
   - Click extension icon (👻)
   - Scroll to "Tracked Companies"
   - Search for "Accenture"
   - Is it there?

2. **Update database:**
   - Click extension icon
   - Click "🔄 Update Database"
   - Wait for update to complete
   - Refresh Indeed page

3. **Add company manually:**
   - Click extension icon
   - Type "Accenture" in the input field
   - Click "Add Company"
   - Refresh Indeed page

#### Issue 4: Warning Shows for Wrong Company

**Example:** Job is for "Google" but warning says "Accenture"

**Problem:** Company name extraction error

**Solutions:**
1. Report this specific case with:
   - The Indeed URL
   - What company it should be
   - What company was detected
2. I'll fix the selectors

---

## 🐛 Debug Version (v2.2)

I've created an enhanced debug version with:

**New Features:**
- ✅ Detailed console logging
- ✅ Updated Indeed selectors (2024-2025)
- ✅ Aggressive fallback detection
- ✅ Shows which selectors succeed/fail
- ✅ Better retry logic

**Download:** [ghost-job-detector-v2.2-debug.zip](computer:///mnt/user-data/outputs/ghost-job-detector-v2.2-debug.zip)

**What's different:**
- More comprehensive Indeed selectors
- Searches for `/cmp/` links as fallback
- Logs every step in console
- Easier to diagnose issues

---

## 📊 Testing the Extension

### Test Case 1: Known Ghost Job Company

1. **Go to Indeed.com**
2. **Search for:** "Accenture jobs"
3. **Click any Accenture job**
4. **Expected result:** 🚨 Red warning banner at top
5. **Check console:** Should show "MATCH FOUND!"

### Test Case 2: Good Company

1. **Go to Indeed.com**
2. **Search for:** "Google jobs"
3. **Click any Google job posted recently**
4. **Expected result:** 👍 Green positive banner
5. **Check console:** Should show "not flagged for ghost jobs"

### Test Case 3: Neutral Company

1. **Go to Indeed.com**
2. **Search for:** "Microsoft jobs"
3. **Click any Microsoft job over 14 days old**
4. **Expected result:** No banner (neutral)
5. **Check console:** Should show company name detected

---

## 🔧 Advanced Debugging

### View All Selectors Being Tested

In console, run:
```javascript
document.querySelectorAll('[data-testid="companyName"]')
```

This shows if the selector exists on the page.

### Manually Extract Company Name

In console, run:
```javascript
const companyElement = document.querySelector('[data-testid="companyName"]');
console.log(companyElement ? companyElement.textContent : 'Not found');
```

### Check Extension Storage

In console, run:
```javascript
chrome.storage.local.get(['ghostJobCompanies'], (result) => {
  console.log('Tracked companies:', result.ghostJobCompanies);
});
```

### Force Re-check

In console, run:
```javascript
location.reload();
```

The extension will re-run on page load.

---

## 📸 What to Report

If the extension still isn't working, please provide:

1. **Indeed URL** (exact job posting URL)
2. **Console output** (screenshot or copy/paste)
3. **Extension version** (check in chrome://extensions/)
4. **Browser/OS** (Chrome version, Windows/Mac/Linux)
5. **Company name** (what you expected to see)
6. **What happened** (no banner, wrong banner, error, etc.)

---

## 🚀 Quick Fixes

### Fix 1: Clear Cache
```
1. Chrome Settings → Privacy and Security
2. Clear browsing data
3. Check "Cached images and files"
4. Clear data
5. Reload extension
6. Test again
```

### Fix 2: Reinstall Extension
```
1. Go to chrome://extensions/
2. Remove "Ghost Job Detector"
3. Download v2.2-debug.zip
4. Extract folder
5. Load unpacked
6. Test on Indeed
```

### Fix 3: Check for Conflicts
```
1. Disable other extensions temporarily
2. Test Ghost Job Detector alone
3. If it works, re-enable extensions one by one
4. Find which one conflicts
```

### Fix 4: Use Incognito Mode
```
1. Open Incognito window (Ctrl+Shift+N)
2. Go to chrome://extensions/
3. Enable "Ghost Job Detector" in incognito
4. Test on Indeed job posting
5. If it works, there's a conflict with cookies/cache
```

---

## 🎯 Expected Behavior

### On a Flagged Company Job:

**Within 1-3 seconds of loading the page:**
1. Console shows detection messages
2. Company name is extracted
3. Match is found in database
4. Red warning banner appears at top
5. Banner shows company name and severity

### On a Non-Flagged Fresh Job:

**Within 1-3 seconds:**
1. Console shows detection messages
2. Company name is extracted
3. No match in database
4. Job age is checked (<14 days)
5. Green positive banner appears
6. Banner auto-dismisses after 8 seconds

### On Search Results Page:

**Nothing happens:**
- Extension only works on job posting pages
- Search results are not monitored
- This is by design

---

## 📞 Still Need Help?

### Option 1: Check Console Carefully

The debug version logs everything. The console messages will tell you exactly what's happening:
- Is the extension loading?
- Is it finding the company name?
- Is the company in the database?
- Are there any JavaScript errors?

### Option 2: Try Different Job Sites

Test if the extension works on:
- **LinkedIn Jobs** (most reliable)
- **Glassdoor** (good support)
- **ZipRecruiter** (basic support)

If it works on LinkedIn but not Indeed, the issue is Indeed-specific.

### Option 3: Manual Company Check

Even if the extension doesn't work automatically:
1. Note the company name from the Indeed posting
2. Click the extension icon
3. Manually search the tracked companies list
4. See if the company is flagged

---

## ✅ Success Indicators

**You'll know it's working when:**
- ✅ Console shows `[Ghost Job Detector]` messages
- ✅ Company name is detected correctly
- ✅ Banner appears at top of page (red or green)
- ✅ Company matches the actual job posting
- ✅ Severity level makes sense based on job age

---

## 🔄 Update to v2.2 Debug

The latest version includes:
- **10+ new Indeed selectors** (2024-2025 structure)
- **Comprehensive logging** (see everything happening)
- **Fallback detection** (tries harder to find company)
- **Better error handling** (more resilient)

[Download v2.2-debug here](computer:///mnt/user-data/outputs/ghost-job-detector-v2.2-debug.zip)

---

**Remember:** The most common issue is being on the wrong page (search results instead of job posting). Make sure you click INTO a specific job!

**Version 2.2 Debug | November 2025**
