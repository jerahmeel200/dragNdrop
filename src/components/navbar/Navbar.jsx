import classes from "./navbar.module.css";
// import Logo from "./../../assets/images/gallery-logo.jpg";
const Navbar = () => {
  return (
    <div className={classes.navComp}>
      <div className={classes.logo}>
        {/* <img src={Logo} alt="logo" /> */}
        <h3>D-N-D</h3>
      </div>
      <div className={classes.bars}>sidebar</div>
    </div>
  );
};

export default Navbar;
