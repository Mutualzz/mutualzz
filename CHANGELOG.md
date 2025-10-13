# Changelog

## REST v2.0.0

- REST: made so crop for the avatars is optional (mateie)
- REST: Increased previous avatar size from 5 to 9 (mateie)
- REST: Added a way to remove prevoius avatars (mateie)
- @me Patch Route: Made it so the previous avatars appear by latest to oldest (Azrael)
- REST: Fixed duplicate previous avatars (Azrael)
- Avatar: Fixed a bug with applying previous avatars (Azrael)
- Me Patch: Fixed hoew default and uploaded avatars are processed (mateie)
- Avatars: Fixed some bugs with avatar saving to the database and cloud (mateie)
- Backend: Added communication between servers (rest, gateway and etc) thru RabbitMQ (mateie)
- Routes: added user get route (mateie)
- Constants: Updated max file size 16 (mateie)
- Avatars: Fixed uploading issues and gif handling (mateie)
- REST (Development): added a log to show what middlwares are loaded (mateie)
- REST: added avatar uploading (mateie)
- Database & REST: Fixed accentColor being generated in a wrong manner (mateie)

## Gateway v2.0.0

- Backend: Added communication between servers (rest, gateway and etc) thru RabbitMQ (mateie)

## CDN v2.0.0

- CDN: Much better image support with better caching and added avif and animated webp support (Azrael)
- CDN: Fixed origin issues (Azrael)
- CDN: Optimized Default avatars (mateie)
- CDN: Added Avatars and optimized their fetching (mateie)

## App v2.0.0

- General: Fixed Infrastructure (Azrael)
- UserSettingsModal: made it non translucent (Azrael)
- Themes: Gave custom themes more colors and looks cooler :3 (Azrael)
- Modal: Fixed modal margins (Azrael)
- AvatarUpload: Made cropping optional (mateie)
- AvatarDraw: Added a way to draw avatars :3 (mateie)
- AvatarDraw: Added mobile responsiveness (Azrael)
- Login/Register: Fixed Inputs not being fullWidth (Azrael)
- Avatars: Added a way to remove previous avatars (mateie)
- Theme Creator: Randomize colors everytime a user wants to start from scratch (mateie)
- User Drawer: Made it non swipeable. Can cause users to accidentally close the app (Azrael)
- Default/Previous Avatars: Fixed feedback when saving the chosen avatar (Azrael)
- Avatars: Added Choosing Previous and Default Avatars (Azrael)
- Stores: Split theme to its own DraftStore (will be used for other types of drafts in the future) (Azrael)
- Avatars: Added Default and Previous Avatar selection (Azrael)
- Avatars: Working on selecting previous and default avatars (mateie)
- UserSettings: Added a way to remove your avatar and revert to default (mateie)
- AvatarUpload: More feedback updates when the avatar is uploading (mateie)
- User Dropdown: Fixed the dropdown positioning (mateie)
- REST Util: Fixed a semantic naming for the log (mateie)
- Bottom Navigation: Fixed mobile responsiveness (mateie)
- Avatar Upload: Fixed some visual bugs when the avatar is uploading (mateie)
- Download Button: Shortened from "Download App" to "Download" (mateie)
- Package JSON: Some script changes (mateie)
- Avatar Upload: Made Avatar upload responsive (mateie)
- Updated versions for mobile (mateie)
- App Store: Added user store (mateie)
- Stores: Fixed some types and removed UserStore logger (unused) (mateie)
- Users: Working on user updating system (with stores, gateway and etc.) (mateie)
- Modal: Added a way to close all modals with a single function (mateie)
- Eslint: Removed mention of electron (mateie)
- REST: added some fixes with the patch for mdata (mateie)
- Navigations: Added privacy policy top and bottom nav, and made it look neat ^^ (mateie)
- Privacy: Added a privacy policy page (mateie)
- Main Page: Fixed some styling (mateie)
- Fixed script again (mateie)

## Types v2.0.0

- Type fixes (Azrael)
- Updated packages (Azrael)
- updated packages (Azrael)
- Version updatef (mateie)
- CDNRoutes: Updated userAvatar route (Azrael)
- Gateway: Fixed Ready payload user type (mateie)
- Gateway: Added a UserUpdate dispatch event (mateie)
- API: Added a private user and a normal user (mateie)
