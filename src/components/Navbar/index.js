import "./index.css";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-bar">
        <img src="assets/cionlogo.webp" alt="cion-logo" />
      </div>
      <div className="nav-bar__profile-details">
        <img src="assets/Ellipse 4.png" alt="profile-logo" />
        <div className="nav-bar__select-profile-text">
        <select className="nav-bar__select-container">
          <option>Sujatha Varma</option>
          <option>john</option>
          <option>Varma</option>
        </select>
        <h2 className="nav-bar__h2">Ameerpet Cancer Coach</h2>
        </div>
      </div>
    </nav>
  );
}
