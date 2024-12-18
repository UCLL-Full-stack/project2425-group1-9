import Head from 'next/head';
import Header from '../components/header';
import styles from '../styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Todos</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            With the Todo App you can register your tasks and always finish your tasks on time!
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
