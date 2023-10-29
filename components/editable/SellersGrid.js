import React, { useEffect, useState } from 'react';
import SellerFlexItem from '../shared/SellerFlexItem';
import EditableSellerFlexItem from './EditableSellerFlexItem';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SellersGrid = () => {
  const [isSellers, setIsSellers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sellers' },
        () => {
          getSellers();
        }
      )
      .subscribe();
  });

  const getSellers = async () => {
    let { data: sellers, error } = await supabase.from('sellers').select('*');
    if (!error) {
      setIsSellers(sellers);
    }
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl px-6 md:px-8 mx-auto gap-x-16 gap-y-20 pb-24'>
        {isSellers &&
          isSellers.length > 0 &&
          isSellers.map((it, i) => (
            <div key={i} className='h-full w-full'>
              <EditableSellerFlexItem
                image={it.image}
                alt={it.shop_name}
                headline={it.shop_name}
                subheadline={it.name}
                link={it.link}
                subtitle={it.description}
                id={it.id}
                category={it.category}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SellersGrid;
