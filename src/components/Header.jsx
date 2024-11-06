const Header = ({ handleLogout, userEmail }) => {

  const username = userEmail.split('@')[0];
  return (
    <>
      <div className="header">
        <span>Welcome, {username}</span>
        <button onClick={handleLogout} className="btn">Log Out</button>
      </div>
    </>
  );
};
export default Header;