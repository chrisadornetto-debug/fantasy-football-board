function Header() {
  return (
    <header>
      <h1>🏈 Fantasy Football Draft Board</h1>
      <p>Build your own rankings.</p>
<button
  onClick={() => {
    if (window.confirm("Reset the entire draft board?")) {
      onReset();
    }
  }}
>
  Reset Board
</button>    </header>
  );
}

export default Header;