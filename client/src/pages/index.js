import { useUser } from './_app';
import Head from 'next/head';

export default function Home() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      setUser(null);
    }
  };

  return (
    <>
      <Head>
        <title>Discord Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center relative w-full max-w-md">
          {!user ? (
            <a href="http://localhost:5000/api/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Login with Discord
            </a>
          ) : (
            <div>
              {user.banner ? (
                <img src={`https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=600`} alt="Banner" className="w-full h-32 object-cover rounded-t-lg" />
              ) : (
                <div className="w-full h-32 bg-gray-700 rounded-t-lg"></div>
              )}
              <div className="relative">
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                  alt="Avatar"
                  className="rounded-full w-24 h-24 mx-auto -mt-12 border-4 border-gray-800"
                />
              </div>
              <h2 className="text-2xl mt-4">{user.username}</h2>
              <p className="text-gray-400 mt-2">ID: {user.id}</p>
              <div className="mt-6">
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
