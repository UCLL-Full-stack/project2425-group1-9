import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Header from '../components/header';
import styles from '../styles/home.module.css';

const Home: React.FC = () => {
  const { t } = useTranslation('common'); 

  return (
    <>
      <Head>
        <title>{t('todos')}</title>
        <meta name="description" content={t('courses_app')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>{t('welcome')}</h1>
        </span>

        <div className={styles.description}>
          <p>{t('todo_description')}</p>
        </div>

        <div>
          <img src="/images/Todo.jpg" alt="Todo foto" />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Home;