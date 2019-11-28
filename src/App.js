import React from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row">
          <Layout />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
