import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Layout from '../components/layout/Layout';
import Login from '../components/shared/Login';
import AdminConsole from '../components/shared/AdminConsole';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../authSlice';

const Page = () => {
  //   const [isUser, setIsUser] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        dispatch(setUser());
      }
      // console.log('session', session);
    });
  });

  return user ? <AdminConsole /> : <Login />;
};

export default Page;
