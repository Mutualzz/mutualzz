# Changelog

## REST v2.0.0

- Avatar Upload: Made so crop for the avatars is optional (Azrael)
- Previous Avatars: Increased previous avatar size from 5 to 9 (Azrael)
- Previous Avatars: Added a way to remove prevoius avatars (Azrael)
- Previous Avatars: Made it so the previous avatars appear by latest to oldest (Azrael)
- Previous Avatars: Fixed duplicate previous avatars (Azrael)
- Previous Avatars: Fixed a bug with applying previous avatars (Azrael)
- Default/Previous Avatars: Fixed how default and uploaded avatars are processed (Azrael)
- Avatar Upload: Fixed some bugs with avatar saving to the database and cloud (Azrael)
- Bridge: Added communication between servers (rest, gateway and etc) thru RabbitMQ (Azrael)
- Routes: Added user get route (Azrael)
- Uploads: Updated max file size 16 (Azrael)
- Uploads: Fixed uploading issues and gif handling (Azrael)
- Avatars: Added avatar uploading (Azrael)
- User: Fixed accentColor being generated in a wrong manner (Azrael)

## Gateway v2.0.0

- Bridge: Added communication between servers (rest, gateway and etc) thru RabbitMQ (Azrael)

## CDN v2.0.0

- Much better image support with better caching and added avif and animated webp support (Azrael)
- Optimized Default avatars (Azrael)
- Added Avatars and optimized their fetching (Azrael)

## App v2.0.0

- Fixed Infrastructure (Azrael)
- Made it non translucent (Azrael)
- Gave custom themes more colors and looks cooler :3 (Azrael)
- Fixed modal margins (Azrael)
- Made cropping optional on uploading avatars (Azrael)
- Added a way to draw avatars :3 (Azrael)
- Fixed Inputs not being fullWidth on Login and Register Pages (Azrael)
- Added a way to remove previous avatars (Azrael)
- Randomize colors everytime a user wants to start from scratch in theme creator (Azrael)
- Made it non swipeable. Can cause users to accidentally close the app with user drawer (Azrael)
- Fixed feedback when saving the chosen avatar with avatars (Azrael)
- Added Choosing Previous and Default Avatars (Azrael)
- Split theme to its own DraftStore (will be used for other types of drafts in the future) (Azrael)
- Added Default and Previous Avatar selection (Azrael)
- Working on selecting previous and default avatars (Azrael)
- Added a way to remove your avatar and revert to default (Azrael)
- More feedback updates when the avatar is uploading (Azrael)
- Fixed the dropdown positioning (Azrael)
- Fixed a semantic naming for the log in the rest utilities (Azrael)
- Fixed some visual bugs when the avatar is uploading (Azrael)
- Shortened from "Download App" to "Download" (Azrael)
- Made Avatar upload responsive (Azrael)
- Added user store (Azrael)
- Fixed some types and removed UserStore logger (unused) (Azrael)
- Added a way to close all modals with a single function (Azrael)
- Added some fixes with the patch for FormData (Azrael)
- Added privacy policy top and bottom nav, and made it look neat ^^ (Azrael)
- Privacy Policy: Added a privacy policy page (Azrael)
- Fixed some styling (Azrael)

## Types v2.0.0

- User: Updated userAvatar route for the CDN (Azrael)
- Gateway: Fixed Ready payload user type for the gateway (Azrael)
- Gateway: Added a UserUpdate dispatch event for the gateway (Azrael)
- API: Added a private user and a normal user for the api (Azrael)
