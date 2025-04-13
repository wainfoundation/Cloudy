import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CloudyPi - Web3 Gaming Platform</title>
        <meta name="description" content="CloudyPi - A Web3 Gaming Platform powered by Pi Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to CloudyPi
          </h1>
          <p className="text-center text-gray-600 mb-8">
            A Web3 Gaming Platform powered by Pi Network
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add your game cards or content here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 