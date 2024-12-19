import { User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../components/Language/LanguageSelector';
import { useTranslation } from 'next-i18next';


const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation('common'); 


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
        {t('todo_app')}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t('home')}
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          {t('users')}
        </Link>
        <Link href="/tasks" className="nav-link px-4 fs-5 text-white">
          {t('tasks')}
        </Link>

        {!loggedInUser && (
          <>
            <Link href="/login" className="nav-link px-4 fs-5 text-white">
              {t('login')}
            </Link>
            <Link href="/signup" className="nav-link px-4 fs-5 text-white">
              {t('signup')}
            </Link>
            <LanguageSwitcher />
          </>
        )}

        {loggedInUser && (
          <>
            <a
              href="/login"
              onClick={handleClick}
              className="nav-link px-4 fs-5 text-white"
            >
              {t('logout')}
            </a>
            <div className="nav-link px-4 fs-5 text-white">
              {t('welcome')}, {loggedInUser.name}!
            </div>
            <LanguageSwitcher />
          </>
        )}
      </nav>
    </header>
  );
};



export default Header;
