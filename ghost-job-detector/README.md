# Ghost Job Detector

Warns you when viewing job postings from companies reported to post ghost jobs. Supports Firefox MV3 and Chrome (with WebExtension polyfill).

## Features
- Red warning banner for flagged companies
- Green positive indicator for safe postings (toggleable)
- Blue info banner for neutral updates
- Dark Mode support across popup and in-page banners
- Auto-update ghost company list daily; manual refresh from popup

## Build & Load
- Firefox: go to about:debugging → This Firefox → Load Temporary Add-on → select manifest.json
- Chrome (with polyfill): chrome://extensions → Load unpacked → select folder

## Distribution
See “Packaging and Distribution” in the project or the guide provided.
