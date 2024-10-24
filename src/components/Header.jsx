const Header = ({ handleLogout }) => {
  return (
    <>
      <div className="header">
        {/* <button onClick={handleLogout} className="btn">Change Password</button>
        <button onClick={handleLogout} className="btn">Change Email</button> */}
        <button onClick={handleLogout} className="btn">Log Out</button>
      </div>
    </>
  );
};
export default Header;