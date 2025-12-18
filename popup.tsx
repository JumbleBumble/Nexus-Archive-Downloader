function IndexPopup() {
  return (
    <div
      style={{
        width: 320,
        padding: 16,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        lineHeight: 1.4
      }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
        Nexus Archive Downloader
      </h2>

      <p style={{ margin: "10px 0 0", fontSize: 13 }}>
        Adds a <strong>Download</strong> button next to archived files on Nexus
        Mods archived file pages.
      </p>

      <p style={{ margin: "10px 0 0", fontSize: 13 }}>
        Runs only on <strong>nexusmods.com</strong>.
      </p>

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <a
          href="https://www.nexusmods.com/"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13 }}>
          Open Nexus Mods
        </a>
      </div>
    </div>
  )
}

export default IndexPopup
