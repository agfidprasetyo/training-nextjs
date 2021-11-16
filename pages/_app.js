import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import { useEffect } from "react";
import Layout from '../src/components/layout';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Layout>
      <p>tes</p>
      <Component {...pageProps} isLogin={false} />
    </Layout>
  )
}

export default MyApp
