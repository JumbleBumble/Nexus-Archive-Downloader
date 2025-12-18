# Nexus Archive Downloader

A Chrome (Manifest V3) extension built with Plasmo that adds a **Download** button next to archived files on Nexus Mods archived file listings.

## What it does

- Detects Nexus Mods archived file listing pages.
- Injects a small **Download** button next to each archived file entry.
- Opens the corresponding Nexus download/redirect URL in a new tab to initiate the standard download flow.

## Scope

- Runs only on `https://www.nexusmods.com/*`.
- Only activates its UI logic when the current page is the archived files view (`tab=files` and `category=archived`).

## Permissions

This extension requests the following permissions:

- `tabs`: Used to open the download URL in a new tab.
- `storage`: Reserved for future use (e.g., queueing or user preferences).
- Host permissions: `https://www.nexusmods.com/*`

## Development

Install dependencies:

```bash
npm install
```

Run the development build:

```bash
npm run dev
```

Load the unpacked extension from the Plasmo dev output directory (commonly `build/chrome-mv3-dev`).

## Production build

Build:

```bash
npm run build
```

Package (creates a zip in the `build/` directory):

```bash
npm run package
```

## Notes / Limitations

- The extension relies on Nexus Mods DOM structure (e.g., `.file-expander-header[data-id]`). If Nexus updates their UI, selectors may need updates.
- The extension does not bypass authentication or alter the download mechanism; it triggers the standard Nexus download redirect in a new tab.
