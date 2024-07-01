import { useState, useEffect } from 'react';
import { supabase } from '../lib/API';
import Layout from '../components/layout/Layout';
import Login from '../components/shared/Login';
import AdminConsole from '../components/shared/AdminConsole';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../authSlice';

const Page = () => {
  //   const [isUser, setIsUser] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        dispatch(setUser());
      }
    });
  });

  return user ? <AdminConsole /> : <Login />;
};

export default Page;
