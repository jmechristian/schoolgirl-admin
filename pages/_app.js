import '../styles/globals.css';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { createClient } from '@supabase/supabase-js';
import { store } from '../store';
import { Provider } from 'react-redux';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

export default function App({ Component, pageProps }) {
  // const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
