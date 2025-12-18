import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://www.nexusmods.com/*/mods/*"],
  run_at: "document_idle"
}

const INJECTED_ATTR = "data-nad-download-injected"

const isArchivedFilesPage = () => {
  try {
    const url = new URL(window.location.href)
    return (
      url.searchParams.get("tab") === "files" &&
      url.searchParams.get("category") === "archived"
    )
  } catch {
    return false
  }
}

const getGameAndModId = () => {
  const parts = window.location.pathname.split("/").filter(Boolean)

  const gameDomain = parts[0]
  const modsIndex = parts.indexOf("mods")
  const modId = modsIndex >= 0 ? parts[modsIndex + 1] : undefined

  if (!gameDomain || !modId) {
    return null
  }

  return { gameDomain, modId }
}

const createDownloadButton = (downloadUrl: string) => {
  const button = document.createElement("button")
  button.type = "button"
  button.textContent = "Download"

  const styles = button.style
  styles.marginLeft = "8px"
  styles.display = "inline-flex"
  styles.alignItems = "center"
  styles.gap = "6px"
  styles.padding = "2px 8px"
  styles.borderRadius = "6px"
  styles.border = "1px solid var(--colour-stroke-moderate)"
  styles.background = "var(--colour-surface-low-60)"
  styles.color = "var(--colour-neutral-strong)"
  styles.fontSize = "12px"
  styles.fontWeight = "600"
  styles.lineHeight = "18px"
  styles.cursor = "pointer"
  styles.userSelect = "none"
  styles.webkitUserSelect = "none"
  styles.transition = "transform 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out"

  const setIdle = () => {
    styles.background = "var(--colour-surface-low-60)"
    styles.borderColor = "var(--colour-stroke-moderate)"
    styles.transform = "scale(1)"
  }

  const setHover = () => {
    styles.background = "var(--colour-surface-mid)"
    styles.borderColor = "var(--colour-stroke-strong)"
  }

  const setActive = () => {
    styles.transform = "scale(0.98)"
  }

  const setFocus = () => {
    styles.boxShadow = "0 0 0 2px var(--colour-focus-subdued)"
    styles.outline = "none"
  }

  const clearFocus = () => {
    styles.boxShadow = ""
  }

  setIdle()

  button.addEventListener("mouseenter", () => setHover())
  button.addEventListener("mouseleave", () => {
    setIdle()
    clearFocus()
  })
  button.addEventListener("mousedown", () => setActive())
  button.addEventListener("mouseup", () => {
    setHover()
    styles.transform = "scale(1)"
  })
  button.addEventListener("focus", () => setFocus())
  button.addEventListener("blur", () => clearFocus())

  button.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    window.open(downloadUrl, "_blank", "noopener,noreferrer")
  })

  return button
}

const injectButtons = () => {
  if (!isArchivedFilesPage()) return

  const gameAndMod = getGameAndModId()
  if (!gameAndMod) return

  const archivedFiles = document.querySelectorAll<HTMLElement>(
    ".file-expander-header[data-id]"
  )

  for (const el of archivedFiles) {
    if (el.hasAttribute(INJECTED_ATTR)) continue

    const fileId = el.getAttribute("data-id")
    if (!fileId) continue

    const downloadUrl = `https://www.nexusmods.com/${gameAndMod.gameDomain}/mods/${gameAndMod.modId}?tab=files&file_id=${encodeURIComponent(
      fileId
    )}`

    el.appendChild(createDownloadButton(downloadUrl))
    el.setAttribute(INJECTED_ATTR, "true")
  }
}

const start = () => {
  injectButtons()

  const observer = new MutationObserver(() => injectButtons())
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
} else {
  start()
}
