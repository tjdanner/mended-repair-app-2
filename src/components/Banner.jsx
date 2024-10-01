import mendedLogo from "../assets/Mended-Hearts-LOGO-full®.png";

const Banner = () => {
  return (
    <>
      <section className="banner-section">
        <img className="mended-logo" src={mendedLogo} alt="Mended Hearts Logo." />
        <div className="title-container">
          <h1>Repair Tracking App</h1>
          <p>Enter in customer credentials to create a service ticket.</p>
        </div>
      </section>
    </>
  );
};
export default Banner;