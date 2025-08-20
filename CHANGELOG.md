# Changelog

## Mutualzz UI

- Utils: Removed getContrastRatio, we never use it. we have getLuminance (mateie)
- Popover: added closeOnClickOutside (toggleable via prop) (mateie)
- InputColor: made color picker non-controlled (not necessary) (mateie)
- CircularProgress: Fixed sizes not applying correctly (mateie)
- List: FIxed orientation not being passed in ListRoot (mateie)
- InputColor: made RandomIcon adaptable with luminance (mateie)
- InputColor: Synced value change with the input (mateie)
- All: Added forwardRef where needed (mateie)
- InptuRoot: Fixed luminance bug (mateie)
- Applicable components: Fixed how text color changes with background luminance depeneding darkness or lightness of component's background (mateie)
- InputColor: Added a button for random colors ^^ (toggleable) (mateie)
- Button: No need to export baseSizeMap (mateie)
- Util -> getLuminance: return null if the color is invalid (mateie)
- IconButton: Implemented (mateie)
- Radio: Fixed priorities for color, variant, size (the child gets prioritized) (mateie)
- Option: Fixed priorities for color, variant, size (the child gets prioritized) (mateie)
- Checkbox: Fixed priorities for color, variant, size (the child gets prioritized) (mateie)

## Mutualzz

- PlaygroundLeftSidebar: Removed unused import (mateie)
- Register Page: Same as Login page (mateie)
- Login Page: Fixed Form alignment and made the back button prettier (mateie)
- Playground: A lot of reallignments, style changes, fixes and rework (mateie)
- UI Index: Same as Root (mateie)
- Home Page: Removed logo (moved it to top nav) (mateie)
- Root: How its aligned and styled with proper flexbox (mateie)
- App: Added top navigation (mateie)
- Markdown Input: Made it be able to accept Ref (mateie)
- AppStore: Fixed Logger import (mateie)
- Project: Fixed some eslint issues (mateie)
