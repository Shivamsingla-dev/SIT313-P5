
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function goToSection(sectionId) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>DEV@Deakin</h1>
        </Link>

        <nav>
          <a href="/#articles" onClick={(e) => {
            e.preventDefault();
            goToSection("articles");
          }}>
            Articles
          </a>

          <a href="/#tutorials" onClick={(e) => {
            e.preventDefault();
            goToSection("tutorials");
          }}>
            Tutorials
          </a>

          <a href="/#about" onClick={(e) => {
            e.preventDefault();
            goToSection("about");
          }}>
            About
          </a>
        </nav>

        <div className="header-buttons">
          <Link to="/post" className="header-btn post-nav-btn">
            Post
          </Link>

          <Link to="/login" className="header-btn">
            Log In
          </Link>

          <Link to="/register" className="header-btn signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
