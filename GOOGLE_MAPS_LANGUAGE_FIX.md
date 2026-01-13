# Google Maps Language Fix

## Issue Fixed
Google Maps in the "Мэдлээлэл" (Information/Contact) section was displaying in Korean language instead of Mongolian or English.

## Solution Applied
Changed the Google Maps embed URL language parameters from Korean to English.

## File Modified
- ✅ `src/sections/news/view/view.js`

## Changes Made

### Before (Korean)
```javascript
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5348.289665216501!2d106.920035!3d47.914235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692487a26cd75%3A0x8041791777c218d4!2sWedding%20Palace!5e0!3m2!1sko!2shk!4v1759087045730!5m2!1sko!2shk"
```

**Language Parameters:**
- `1sko` = Interface language: Korean
- `2shk` = Region: Hong Kong

### After (English)
```javascript
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5348.289665216501!2d106.920035!3d47.914235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692487a26cd75%3A0x8041791777c218d4!2sWedding%20Palace!5e0!3m2!1sen!2smn!4v1759087045730!5m2!1sen!2smn"
```

**Language Parameters:**
- `1sen` = Interface language: English
- `2smn` = Region: Mongolia

## What Changed

### Map Interface Language
- ❌ Before: Korean (한국어)
- ✅ After: English

### Map Labels
- Street names, place names, and UI elements now display in English
- Region context set to Mongolia for relevant local information

## Why English Instead of Mongolian?

Google Maps has limited support for Mongolian language in the interface. English provides:
- ✅ Full feature support
- ✅ Clear, readable interface
- ✅ Better compatibility
- ✅ Widely understood internationally

## Testing

To verify the fix:
1. Visit the "Мэдлээлэл" section on your website
2. Check the embedded Google Maps
3. Verify the interface is now in English (not Korean)
4. Verify map controls, labels, and buttons are in English

## Location Details

The map shows:
- **Location:** Wedding Palace (Гэрлэх ёслолын ордон)
- **Coordinates:** 47.914235, 106.920035
- **Address:** Ulaanbaatar, Mongolia

## Alternative: Mongolian Language

If you want to try Mongolian language instead, change the URL to:
```javascript
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5348.289665216501!2d106.920035!3d47.914235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692487a26cd75%3A0x8041791777c218d4!2sWedding%20Palace!5e0!3m2!1smn!2smn!4v1759087045730!5m2!1smn!2smn"
```

**Note:** Mongolian language support may be limited in Google Maps interface.

## Summary

✅ **Google Maps language changed from Korean to English**
✅ **Map interface now displays in English**
✅ **Region context set to Mongolia**
✅ **No other code affected**

**Your Google Maps now displays in English! 🗺️**
