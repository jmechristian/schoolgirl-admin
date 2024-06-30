import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../lib/API';

const Page = () => {
  const [isSellers, setIsSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = async () => {
    const res = await supabase.from('test_table').select('*');
  };

  return <div>Nothing</div>;
};

export default Page;
