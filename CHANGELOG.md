# Changelog

## App v6.26.0

- Settings: Added Active Sessions page with per-session revoke and log-out-everywhere-else (Azrael)
- Settings: Added Messages, Privacy & Safety, Desktop, and Keybinds pages with extended preferences (Azrael)
- Settings: Added startup mode, UI density, layout/accessibility, and composer options in Appearance (Azrael)
- Notifications: Added per-space and per-channel mute levels and durations via context menus (Azrael)
- Navigation: Moved hub mode switcher to title bar; redesigned sidebar rail (Azrael)
- Navigation: Bridge chat unread indicators on space sidebar icons (Azrael)
- Chat: Added drag-and-drop file attachments in channels and DMs (Azrael)
- Chat: Added attachment spoiler support when sending files (Azrael)
- Chat: Added compact/default message layout and chat font scale preferences (Azrael)
- Feed: Added threaded post comments with sort, reply threads, and load more (Azrael)
- Profiles: Added profile unavailable state for restricted or missing profiles (Azrael)
- Keybinds: Added global shortcuts for member list toggle and opening settings (Azrael)

## Mobile v3.13.0

- Settings: Added Sessions, Messages, and Privacy & Safety screens (Azrael)
- Settings: Added startup mode, UI density, and accessibility options (Azrael)
- Notifications: Added per-space mute levels and durations via space menu (Azrael)
- Navigation: Replaced floating mode switcher with hub tabs (DMs / Spaces / Feed) (Azrael)
- Navigation: Bridge chat unread indicators on space sidebar icons (Azrael)
- Chat: Added attachment spoiler support (Azrael)
- Chat: Added compact/default message layout and chat font scale preferences (Azrael)
- Feed: Added threaded post comments with sort, reply threads, and load more (Azrael)
- Feed: Simplified snap feed view (removed SnapFeedList) (Azrael)
- Profiles: Added profile unavailable state (Azrael)

## REST v6.7.0

- Sessions: Added GET/DELETE /@me/sessions APIs for listing and revoking sessions (Azrael)
- Settings: Added extendedSettings JSONB column and validation for user preferences (Azrael)
- Notifications: Added space notification settings and channel read-state notification levels (Azrael)
- Privacy: Enforced whoCanDm and profileVisibility server-side (Azrael)
- Privacy: Added viewerCanDm on user objects (Azrael)
- Messages: Added attachment spoiler support on upload (Azrael)
- Auth: Password change now revokes all sessions (Azrael)
- Push: Push notifications respect per-channel/space mute and mention-only settings (Azrael)

## Gateway v6.3.0

- Events: Added READ_STATE_UPDATE and SPACE_NOTIFICATION_SETTINGS_UPDATE dispatches (Azrael)
- Ready: Includes spaceNotificationSettings in ready payload (Azrael)
- SubscribeUser: Restricted to friends, shared space members, or DM participants (Azrael)
- LazyRequest: Verifies channel view permission before lazy-loading members (Azrael)

## Client v0.1.0

- Shared navigation, sessions, settings, permissions, message layout, and store base classes (Azrael)

## Themes v0.1.0

- Extracted shared theme definitions and builders for cross-platform rendering (Azrael)

## Types v4.5.0

- Settings: Added UserExtendedSettings with defaults and merge helpers (Azrael)
- Navigation: Added ModeKey and modeKeyFromPath (Azrael)
- Sessions: Added APIMeSession type (Azrael)
- Notifications: Added NotificationLevel enum and read-state fields (Azrael)
- Messages: Added spoiler flag on APIAttachment (Azrael)
- Privacy: Added viewerCanDm on APIUser (Azrael)

## Validators v4.5.0

- Settings: Added validateExtendedSettingsUpdate (Azrael)
- Notifications: Added space and channel notification settings schemas (Azrael)
- Messages: Added attachmentSpoilers on message create (Azrael)
- Auth: Stricter registration and password reset validation (Azrael)

## i18n v4.5.0

- Settings: Added strings for sessions, messages, privacy, desktop, keybinds, and accessibility (Azrael)
- Chat: Added notification context menu and spoiler strings (Azrael)
- Feed: Added threaded comment strings (Azrael)

## Minecraft Bridge v1.2.0

- Docs: Player install guide notes Mutualzz Voice **Alt** keybinds (Azrael)

## Minecraft Voice v1.4.0

- Controls: Default modifier changed from **Ctrl** to **Alt** (Alt+Shift on Fabric; Shift stand-in on NeoForge/Forge) (Azrael)
- Docs: Updated controls table and troubleshooting for Alt keybinds (Azrael)

## App v6.25.0

- Calls: Added DM voice/video calling with ringing, accept/decline, and call notices (Azrael)
- Markdown: Added colored text via the formatting toolbar (Azrael)
- Profiles: Added pronouns support (Azrael)
- Notifications: Added per-sound toggles for calls, messages, and voice (Azrael)
- What’s New: Redesigned update popup (Azrael)

## Mobile v3.12.0

- Calls: Added DM voice/video calling with ringing, accept/decline, and call notices (Azrael)
- Markdown: Added colored text via the formatting toolbar (Azrael)
- Profiles: Added pronouns support (Azrael)
- Notifications: Added per-sound toggles for calls, messages, and voice (Azrael)
- Voice: Improved iOS Live Activities for voice channels (Azrael)
- What’s New: Redesigned update sheet (Azrael)

## REST v6.6.0

- Calls: Added DM call create/respond APIs and call lifecycle handling (Azrael)
- Profiles: Added pronouns support (Azrael)
- Channels: Track last message id for better list ordering (Azrael)
- Notifications: Added incoming call push notifications (Azrael)

## Gateway v6.2.0

- Calls: Added CallCreate / CallRespond opcodes and call dispatches (Azrael)
- Resume: Buffer events and restore active calls plus voice state on resume (Azrael)

## Voice v2.2.0

- Voice: Enforce server mute/deafen at the media layer (Azrael)
- Voice: Cache Cloudflare TURN credentials and harden ICE / produce paths (Azrael)
- Voice: Pass camera orientation and improve produce/consume auth checks (Azrael)

## UI Mobile v4.2.1

- Sheet / Paper: Timing and surface polish (Azrael)

## UI Core v1.2.1

- Wallpaper: Fixed scrim color formatting (Azrael)

## Types v4.4.0

- Calls: Added call payloads, opcodes, and system message types (Azrael)
- Profiles: Added pronouns fields (Azrael)

## App v6.24.0

- Themes: Added wallpapers / background images (Azrael)
- Themes: Added space themes so a space can share one look for everyone (Azrael)
- Theme Creator: Added wallpaper upload and tuning controls (Azrael)

## Mobile v3.11.0

- Themes: Added wallpapers / background images (Azrael)
- Themes: Added space theme settings (Azrael)
- Theme Creator: Added wallpaper upload and tuning controls (Azrael)

## REST v6.5.0

- Themes: Added wallpaper, background image, and space theme APIs (Azrael)

## CDN v3.1.0

- Themes: Added theme background image serving (Azrael)

## Gateway v6.1.2

- Themes: Wired space theme updates through the gateway (Azrael)

## UI Desktop v5.1.0

- Paper / CssBaseline: Added wallpaper rendering (Azrael)

## UI Mobile v4.2.0

- Paper / NativeBaseline: Added wallpaper rendering (Azrael)

## Types v4.3.0

- Themes: Added wallpaper and space themeId types (Azrael)
