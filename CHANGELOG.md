# Changelog

## Mutualzz UI

- InputColor: fixed color picker being gone and random color button being tiny (mateie)
- Popover: Fixed misbehaving when portal is disabled (mateie)
- Drawer: added an ability to disable portal if needed (mateie)
- Themes: Drawer zIndex should be higher than modal (mateie)
- Paper: added a prop to toggle translucency if gradient (mateie)
- Popover: fixed styling and made elevation as the default prop ^^ (mateie)
- Popover: Update Position upon render, even before its open (mateie)
- Popover: Fixed it overflowing if not enough space ^^ (mateie)
- Popover: Fixed backwards logic, now instead of content, you use trigger prop and pass the children for the content to display (mateie)
- Popover: forgot to export it (oop >.<) (mateie)
- Typography: Fixed colors not being applied correctly (mateie)
- Button: updated padding for the button sizes (more reasonable) (mateie)
- IconButton: removed automatic padding (not needed) and adjusted sizes for the icon inside (mateie)
- Avatar: Need to pass props to the AvatarImage as well ^^ (mateie)
- Link: added flex properties so things align properly (mateie)
- Avatar: fixed props not being passed correctly (mateie)
- CssBaseline: Fixed anchor elements giving defualt stuff (mateie)
- Drawer: Fixed not using portal (mateie)
- Link: Fixed type issues (mateie)
- Link: Added Link component (mateie)
- Typography: Added textColor prop for text color support (mateie)

## Mutualzz Types

- APIUser: added accent color (mateie)

## Mutualzz

- User: Added user drawers, settings and better navigation (mateie)
- Theme Creator: fixed some issues with layout (mateie)
- Modal: Added support for opening multiple modals (mateie)
- Avatar Editor: Bare bones, editing coming soon (mateie)
- Modal: made sure the context doesnt start with "undefined" but rather empty values. Avoids re-render issues (mateie)
- Navigation: Adde bottom navigation for mobile and a user drawer (mateie)
- Top Navigation: Added contextual icons (mateie)
- Download Button: Updated detection logic (mateie)
- Login/Register: Removed home buttons, useless at this point (mateie)
- Device Detection: Added logic to detect ios and android (mateie)

## Mutualzz API

- Database: Added accent color (mateie)
