import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Layout from '../components/layout/Layout';
import Login from '../components/shared/Login';
import AdminConsole from '../components/shared/AdminConsole';

const Page = () => {
  const [isUser, setIsUser] = useState(false);

  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsUser(true);
      }
      // console.log('session', session);
    });
  });

  return isUser ? <AdminConsole /> : <Login />;
};

export default Page;
