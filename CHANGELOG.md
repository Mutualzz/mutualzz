# Changelog

## Mutualzz UI

- Avatar: Made it focusable (Azrael)
- Popover: Fixed initial positioning and added closeOnInteract prop (mateie)

## Mutualzz Types

- CDNRoutes: Updated userAvatar route (Azrael)

## Mutualzz

- User Drawer: Made it non swipeable. Can cause users to accidentally close the app (Azrael)
- Default/Previous Avatars: Fixed feedback when saving the chosen avatar (Azrael)
- Avatars: Added Choosing Previous and Default Avatars (Azrael)
- Stores: Split theme to its own DraftStore (will be used for other types of drafts in the future) (Azrael)
- UserSettings: Added a way to remove your avatar which reverts to your current default (mateie)
- AvatarUpload: More feedback updates when the avatar is uploading (mateie)
- User Dropdown: Fixed the dropdown positioning (mateie)

## Mutualzz API

- REST -> @me PATCH Route: Made it so the previous avatars appear by latest to oldest (Azrael)
- CDN: Much better image support with better caching. Added avif and animated webp support (Azrael)
- REST -> @me PATCH Route: Fixed duplicate previous avatars (Azrael)
- CDN: Fixed origin issues (Azrael)
- REST -> @me PATCH Route: Fixed a bug with applying previous avatars (Azrael)
- REST -> @me PATCH Route Patch: Fixed hoew default and uploaded avatars are processed (mateie)
