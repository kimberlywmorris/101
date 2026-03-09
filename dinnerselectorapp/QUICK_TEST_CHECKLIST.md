# Testing Checklist - Quick Reference

## Quick Test (15 minutes)

### On Mobile
- [ ] Load app on iPhone/Android
- [ ] Allow location
- [ ] Restaurants load
- [ ] Click filter button (collapses properly)
- [ ] Select restaurant
- [ ] Spin wheel
- [ ] Result shows
- [ ] No horizontal scroll
- [ ] All buttons tappable

### On Desktop
- [ ] Load app on desktop (1440px)
- [ ] Full 3-column layout visible
- [ ] All panels sticky
- [ ] Spin animation smooth
- [ ] Hover states work
- [ ] No console errors

### Browsers
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅

---

## Full Test (1-2 hours)

### Functional Features (30 min)
- [ ] **Geolocation**
  - [ ] Allow location works
  - [ ] Deny shows error
  - [ ] Retry works

- [ ] **Filters** (test each)
  - [ ] Radius changes results
  - [ ] Cuisine multi-select works
  - [ ] Price level works
  - [ ] Open now toggle works
  - [ ] Reset works

- [ ] **Wheel**
  - [ ] Spins smoothly
  - [ ] Takes ~3 seconds
  - [ ] Stops on random restaurant
  - [ ] Button disabled during spin
  - [ ] Result updates correctly

- [ ] **Preferences**
  - [ ] Mark favorite works
  - [ ] Favorites tab shows correct list
  - [ ] Mark no-go works
  - [ ] No-go prevents wheel selection

- [ ] **History**
  - [ ] Records each spin
  - [ ] Shows correct count
  - [ ] Click entry shows restaurant

### Responsive Design (20 min)
- [ ] **Mobile (375px)**
  - [ ] Layout stacks vertically
  - [ ] Text readable
  - [ ] Buttons large enough
  - [ ] No horizontal scroll

- [ ] **Tablet (768px)**
  - [ ] 2-column layout
  - [ ] Proportional spacing
  - [ ] Touch friendly

- [ ] **Desktop (1440px)**
  - [ ] 3-column + sidebar
  - [ ] Hover states
  - [ ] Optimal spacing

### Edge Cases (15 min)
- [ ] Filter to 0 restaurants → empty state
- [ ] Filter to 1 restaurant → single slice
- [ ] Mark all 10 as no-go → no spin available
- [ ] No favorites → shows "No favorites yet"
- [ ] No history → shows "No spins yet"
- [ ] Rapid filter changes → no lag
- [ ] Rapid spins → button prevents double-spin

### Performance (10 min)
- [ ] Initial load < 3 seconds
- [ ] Wheel animation 60fps
- [ ] Scroll smooth (no jank)
- [ ] No console errors
- [ ] Throttled 3G: still works

### Accessibility (10 min)
- [ ] Keyboard Tab navigation works
- [ ] Enter/Space activates buttons
- [ ] Focus visible (blue ring)
- [ ] Screen reader reads labels (optional)
- [ ] Zoom to 200% still readable

---

## Issues Found

| Issue | Browser | Device | Severity | Notes |
|-------|---------|--------|----------|-------|
| | | | | |
| | | | | |

---

## Test Results

**Date Tested:** _______________  
**Tester:** _______________  
**Overall Status:** ✅ **PASS** / ⚠️ **PASS WITH ISSUES** / ❌ **FAIL**

**Summary:**
- Total scenarios tested: ___
- Passed: ___
- Failed: ___
- Issues: ___

**Notes:**
__________________________________________________________________

__________________________________________________________________

---

**Sign-off:** Ready for production? **YES** / **NO**
