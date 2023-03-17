import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Sidebar(props) {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/login');
  };

  return (
    <aside className="flex-column space-between py-1 min-100-vh">
      <Link className="text-dark no-underline" to="/">
        <div className='ml-4'>
          <h1 className='app-title'>Meet & Treats</h1>
        </div>
      </Link>
      {props.children}
      <br></br>
      <button className="btn btn-sm btn-light logout-btn mt-5" onClick={logout}>
        Log out
      </button>
    </aside>
  )
};

export default Sidebar;