import { User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        Todo App
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          Users
        </Link>
        <Link href="/tasks" className="nav-link px-4 fs-5 text-white">
          Tasks
        </Link>

        {!loggedInUser && (
          <>
            <Link href="/login" className="nav-link px-4 fs-5 text-white">
              Login
            </Link>
            <Link href="/signup" className="nav-link px-4 fs-5 text-white">
              Signup
            </Link>
          </>
        )}

        {loggedInUser && (
          <>
            <a
              href="/login"
              onClick={handleClick}
              className="nav-link px-4 fs-5 text-white"
            >
              Logout
            </a>
            <div className="nav-link px-4 fs-5 text-white">
              Welcome, {loggedInUser.name}!
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
