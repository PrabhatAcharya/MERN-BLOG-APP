import { Link } from "react-router-dom";

function LandingPageButton() {
  return (
    <Link to="/auth" className="nav-link">
      <button
        style={{
          borderRadius: "5px",
          backgroundColor: "#ed6c02",
          color: "white",
          boxShadow: "10px 5px 5px black ",
        }}
      >
        <span style={{ fontSize: "24px" }}>Join our community!</span>
      </button>
    </Link>
  );
}
function LandingFrameMessage() {
  const style = {
    margin: "auto",
    padding: "10% 35% 10% 15%",
    color: "white",
  };
  return (
    <div className="" style={style}>
      <div style={{ fontSize: "96px" }}>Explore the world of blogging!!</div>

      <div style={{ fontSize: "36px" }}>
        Join our community of bloggers and share your ideas with the world. Get
        started by creating your own blog and start writing today!
      </div>
      <br />
      <LandingPageButton />
    </div>
  );
}
function LandingFrame() {
  const style = {
    backgroundImage: `url(https://images.unsplash.com/photo-1674460039193-700b9e35c172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
  };
  return (
    <div style={style}>
      <LandingFrameMessage />
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <LandingFrame />
    </div>
  );
}
export default HomePage;
