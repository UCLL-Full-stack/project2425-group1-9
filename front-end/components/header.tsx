import Link from 'next/link';
import styles from '@styles/header.module.css'; // Zorg ervoor dat je deze stijl aanmaakt

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>TaskMaster</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tasks">Task List</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;