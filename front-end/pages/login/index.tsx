// pages/login.tsx

import Head from "next/head";
import Header from "../../components/header";
import UserLoginForm from "../../components/users/UserLoginForm";

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Login</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <div className="w-full max-w-lg px-8 py-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <UserLoginForm />
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
