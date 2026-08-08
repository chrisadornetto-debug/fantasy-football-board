import { useRef } from "react";

function Header({
  onReset,
  onExport,
  onImport,
}) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onImport(file);

    // Allows selecting the same file again.
    event.target.value = "";
  };

  return (
    <header className="header">
      <h1>Fantasy Football Board</h1>

      <div className="header-actions">
        <button
          type="button"
          onClick={onExport}
        >
          Export CSV
        </button>

        <button
          type="button"
          onClick={handleImportClick}
        >
          Import CSV
        </button>

        <button
          type="button"
          onClick={onReset}
        >
          Reset Board
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </header>
  );
}

export default Header;