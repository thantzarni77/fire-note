const Navbar = ({ count }) => {
  return (
    <div className="navbarContainer">
      <div className="logo">Fire Note</div>
      <div className="noteCount">Total Notes - {!count ? "0" : count}</div>
    </div>
  );
};

export default Navbar;
