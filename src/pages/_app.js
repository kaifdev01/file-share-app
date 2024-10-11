// pages/_app.js
import { useEffect } from 'react';
import connectDB from '../app/db';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const connectToDB = async () => {
      try {
        await connectDB();
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        // Optionally, handle the error by displaying a message or redirecting the user
      }
    };

    connectToDB();
  }, []); // Empty dependency array to run on mount only

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
