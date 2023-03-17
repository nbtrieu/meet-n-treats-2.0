import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className="flex-column">
        <li>
          <Link className="text-dark no-underline" to="/">
            <h5 className="my-5">
            🏠 Home
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/add-pet">
            <h5 className="mb-5">
            ➕ Add Pet
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/search">
            <h5 className="mb-5">
            🔎 Search
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/explore">
            <h5 className="mb-5">
            🧭 Explore
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/playdates">
            <h5 className="mb-5">
            💞 Play Dates
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/create">
            <h5 className="mb-5">
            📝 Create
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/profiles">
            <h5 className="mb-5">
            👤 Profiles
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/marketplace">
            <h5 className="mb-5">
            🛒 Marketplace
            </h5>
          </Link>
        </li>
        <li>
          <Link className="text-dark no-underline" to="/adoptions">
            <h5 className="mb-5">
            🪺 Adoptions
            </h5>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;