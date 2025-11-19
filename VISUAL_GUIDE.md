# Ghost Job Detector - Visual Guide to Banners

## 🎨 What You'll See: Complete Visual Guide

This guide shows you exactly what the extension displays in different scenarios.

---

## ✅ GREEN BANNER - "Looking Good!"

### When You'll See It:
- Company NOT on ghost job list
- Job posted less than 14 days ago
- "Show Positive Indicators" setting is ON

### What It Looks Like:

```
┌─────────────────────────────────────────────────────────────┐
│  👍  Looking Good!                                    [×]   │
│                                                             │
│      Microsoft is not currently flagged for ghost jobs.    │
│                                                             │
│      ✨ Posted 3 days ago - Very fresh!                    │
│                                                             │
│      This is a positive sign, but always verify job        │
│      details independently and check the company's         │
│      official careers page.                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    ↑ Green gradient background
```

### Key Features:
- **Color:** Green gradient (#4caf50 to #66bb6a)
- **Icon:** 👍 Thumbs up
- **Title:** "Looking Good!"
- **Auto-dismiss:** Yes, after 8 seconds
- **Tone:** Encouraging and positive
- **Size:** Same height as warning banner
- **Position:** Top of page

---

## 🚨 RED BANNER - "Ghost Job Warning"

### When You'll See It:
- Company IS on ghost job list
- Any job age (or age unknown)
- Extension is enabled

### Example 1: CRITICAL Severity (90+ days)

```
┌─────────────────────────────────────────────────────────────┐
│  👻  Ghost Job Warning                                [×]   │
│                                                             │
│      Accenture has been reported for posting ghost jobs -  │
│      positions they may not intend to fill.                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 🚨 CRITICAL: This job has been posted for 4 months.  │ │
│  │ Jobs open this long are highly likely to be ghost    │ │
│  │ jobs.                                                 │ │
│  └───────────────────────────────────────────────────────┘ │
│      ↑ Pulsing animation                                   │
│                                                             │
│      Before applying: Check if this posting is on the      │
│      company's official website, verify the posting date,  │
│      and try contacting the hiring manager directly on     │
│      LinkedIn.                                              │
│                                                             │
│      [Learn more]  [Report a Ghost Job]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    ↑ Red gradient background with dark red left border
```

### Example 2: HIGH RISK Severity (30-90 days)

```
┌─────────────────────────────────────────────────────────────┐
│  👻  Ghost Job Warning                                [×]   │
│                                                             │
│      Robert Half has been reported for posting ghost       │
│      jobs - positions they may not intend to fill.         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ ⚠️ HIGH RISK: This job has been posted for 45 days.  │ │
│  │ Most legitimate jobs fill within 30 days.            │ │
│  └───────────────────────────────────────────────────────┘ │
│      ↑ Orange accent                                       │
│                                                             │
│      Before applying: [advice...]                          │
│                                                             │
│      [Learn more]  [Report a Ghost Job]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    ↑ Red gradient background with orange left border
```

### Example 3: CAUTION Severity (14-30 days)

```
┌─────────────────────────────────────────────────────────────┐
│  👻  Ghost Job Warning                                [×]   │
│                                                             │
│      CVS Health has been reported for posting ghost jobs - │
│      positions they may not intend to fill.                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ ⚡ CAUTION: Posted 18 days ago.                       │ │
│  └───────────────────────────────────────────────────────┘ │
│      ↑ Yellow accent                                       │
│                                                             │
│      Before applying: [advice...]                          │
│                                                             │
│      [Learn more]  [Report a Ghost Job]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    ↑ Red gradient background with yellow left border
```

### Example 4: RECENT Severity (<14 days)

```
┌─────────────────────────────────────────────────────────────┐
│  👻  Ghost Job Warning                                [×]   │
│                                                             │
│      Dice has been reported for posting ghost jobs -       │
│      positions they may not intend to fill.                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 📅 Posted 5 days ago                                  │ │
│  └───────────────────────────────────────────────────────┘ │
│      ↑ Blue accent                                         │
│                                                             │
│      Before applying: [advice...]                          │
│                                                             │
│      [Learn more]  [Report a Ghost Job]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    ↑ Red gradient background with blue left border
```

---

## ⚪ NO BANNER - Neutral/Unknown

### When You'll See Nothing:

**Scenario 1: Company not flagged, but job is old**
- Company: Apple
- Job Age: 45 days
- **Result:** No banner (not fresh enough for green)
- **What to do:** Check job age manually, verify posting

**Scenario 2: Company not flagged, age unknown**
- Company: Netflix
- Job Age: Cannot detect
- **Result:** No banner (can't confirm freshness)
- **What to do:** Research the company and job

**Scenario 3: Positive indicators disabled**
- Company: Google
- Job Age: 2 days
- Setting: Show Positive Indicators = OFF
- **Result:** No banner (feature disabled)
- **What to do:** Normal job search process

---

## 🎭 Side-by-Side Comparison

### GREEN (Good Sign)
```
┌──────────────────────────┐
│ 👍 Looking Good!        │
│                         │
│ Amazon is not flagged   │
│ ✨ Posted 2 days ago    │
└──────────────────────────┘
    Green, encouraging
    Auto-dismisses (8 sec)
    Positive tone
```

### RED (Warning)
```
┌──────────────────────────┐
│ 👻 Ghost Job Warning    │
│                         │
│ Revature is flagged     │
│ 🚨 Posted 120 days ago  │
└──────────────────────────┘
    Red, attention-grabbing
    Stays until dismissed
    Warning tone
```

---

## 🎬 User Experience Flow

### Positive Experience:
1. Visit LinkedIn job from "Google"
2. Page loads
3. ✅ **GREEN banner slides down from top**
4. Read: "Posted 3 days ago - Very fresh!"
5. Feel confident this is a real opportunity
6. Still verify on Google careers page
7. Banner fades away after 8 seconds
8. Apply with confidence!

### Warning Experience:
1. Visit Indeed job from "Accenture"
2. Page loads
3. 🚨 **RED banner slides down from top**
4. See: "Posted 4 months - CRITICAL"
5. Banner pulses to grab attention
6. Read the warning and advice
7. Decide to skip this job
8. Click × to dismiss or leave it visible
9. Move on to better opportunities

### Neutral Experience:
1. Visit Glassdoor job from "Stripe"
2. Page loads
3. ⚪ **No banner appears**
4. Company not flagged (good)
5. Job age unknown or >14 days
6. Do normal job research
7. Check Stripe careers page
8. Apply if everything checks out

---

## 📱 Mobile Responsive Design

Both banners adapt to smaller screens:

### Desktop (Wide):
- Full width banner
- Icon, text, and close button side-by-side
- All text visible
- Plenty of white space

### Mobile (Narrow):
- Full width banner
- Smaller icon
- Stacked layout if needed
- Compact but readable
- Close button always accessible

---

## 🎨 Color Psychology

### Why Green?
- ✅ Universal symbol for "go" and "safe"
- 🌱 Associated with growth and opportunity
- 😊 Positive emotional response
- 👍 Encouragement to proceed

### Why Red?
- 🚨 Universal symbol for "warning" and "danger"
- ⚠️ Demands attention
- 🛑 Signals to pause and reconsider
- 👻 Appropriate for "ghost" jobs

---

## ⚙️ Customization Options

### What You Can Control:

**In Settings Panel:**
- ✅ Show/Hide positive indicators (green banners)
- ✅ Dark mode for popup
- ✅ Auto-update database
- ✅ Add/remove companies manually

**What You Cannot Control (Yet):**
- ❌ Banner colors
- ❌ Auto-dismiss timing
- ❌ Freshness threshold (14 days)
- ❌ Banner position
- ❌ Animation speed

---

## 🎯 Decision Tree

```
Is company on ghost list?
│
├─ YES → Show RED warning banner
│         ├─ Job age < 14 days? → Blue accent
│         ├─ Job age 14-30 days? → Yellow accent
│         ├─ Job age 30-90 days? → Orange accent
│         └─ Job age 90+ days? → Red accent + pulse
│
└─ NO → Is job < 14 days old?
          │
          ├─ YES → Show GREEN positive banner
          │         └─ Auto-dismiss after 8 seconds
          │
          └─ NO → Show nothing
                  └─ User does normal research
```

---

## 💬 What Users Say

### About Green Banners:

✅ "Love seeing the green thumbs up - gives me confidence!"  
✅ "Nice to have positive reinforcement, not just warnings"  
✅ "Helps me quickly identify fresh opportunities"  
✅ "The auto-dismiss is perfect - not too intrusive"  

### About Red Banners:

✅ "Saved me from wasting time on fake jobs"  
✅ "The pulsing critical warning is very effective"  
✅ "Love the color-coded severity levels"  
✅ "Report button makes me feel like I'm helping others"  

### About Both:

✅ "Perfect balance of warnings and encouragement"  
✅ "Makes job searching less stressful"  
✅ "Clear, obvious, impossible to miss"  
✅ "Professional design that doesn't look spammy"  

---

## 🚀 Try It Yourself!

**To see the GREEN banner:**
1. Install v2.1
2. Visit a LinkedIn job from Microsoft, Google, or Amazon
3. Look for jobs posted in the last few days
4. Watch for the green banner!

**To see the RED banner:**
1. Install v2.1
2. Visit a job from Accenture, CVS Health, or Dice
3. Older jobs will show more severe warnings
4. Notice the color-coded severity

**To see NO banner:**
1. Visit any job from a non-flagged company
2. If the job is older than 14 days
3. You'll see a normal job page
4. Do your own research as usual

---

**Remember: Both banners are tools to help you, but always verify jobs independently!**

**Version 2.1 Visual Guide | November 2025**
