import '../styles/globals.css';
import Layout from '../components/layout/Layout';

// const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
