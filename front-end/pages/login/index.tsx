import Head from "next/head";
import Header from "../../components/header";
import UserLoginForm from "../../components/users/UserLoginForm";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; 

const predefinedUsers = [
  { username: "User1", password: "Password123", role: "admin" },
  { username: "User2", password: "Password123", role: "user" },
  { username: "tester", password: "test123", role: "tester" },
];

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Login</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <div className="w-full max-w-lg px-8 py-6 bg-white rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <UserLoginForm />
          </div>

          <div className="w-full max-w-2xl px-8 py-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Predefined Users</h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Password</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {predefinedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Login;