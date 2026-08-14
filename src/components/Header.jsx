import { useRef } from "react";

function Header({
  onReset,
  onExport,
  onImport,
  onUpdateData,
}) {
  const importInputRef = useRef(null);
  const updateInputRef = useRef(null);

  const handleImportFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onImport(file);

    event.target.value = "";
  };

  const handleUpdateFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    onUpdateData(file);

    event.target.value = "";
  };

  return (
    <header className="header">
      <h1>
        Fantasy Football Board
      </h1>

      <div className="header-actions">
        <button
          type="button"
          onClick={onExport}
        >
          Export CSV
        </button>

        <button
          type="button"
          onClick={() =>
            importInputRef.current?.click()
          }
        >
          Import CSV
        </button>

        <button
          type="button"
          onClick={() =>
            updateInputRef.current?.click()
          }
        >
          Update Player Data
        </button>

        <button
          type="button"
          onClick={onReset}
        >
          Reset Board
        </button>

        <input
          ref={importInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={
            handleImportFileChange
          }
          style={{ display: "none" }}
        />

        <input
          ref={updateInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={
            handleUpdateFileChange
          }
          style={{ display: "none" }}
        />
      </div>
    </header>
  );
}

export default Header;