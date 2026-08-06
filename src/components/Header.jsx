function Header({ onReset }) {
  return (
    <header className="header">
      <h1>Fantasy Football Board</h1>

      <button
        type="button"
        onClick={onReset}
      >
        Reset Board
      </button>
    </header>
  );
}

export default Header;