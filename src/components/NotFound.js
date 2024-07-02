import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-component">
      <h2>Page Not Found</h2>
      <Link to="/">Return home</Link>
    </div>
  );
}

export default NotFound;
