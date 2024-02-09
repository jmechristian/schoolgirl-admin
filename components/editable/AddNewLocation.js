import React, { useState } from 'react';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AddNewLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isName, setIsName] = useState('');
  const [isAddress, setIsAddress] = useState('');
  const [isAddressExtra, setIsAddressExtra] = useState('');

  const locationSubmitHandler = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('locations')
      .insert([
        { name: isName, address: isAddress, address_extra: isAddressExtra },
      ])
      .select();
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className='w-full h-full border border-neutral-300 relative'>
      <div className='flex flex-col gap-1 p-2'>
        <TextInput
          name={'name'}
          id={'name'}
          placeholder={'Name'}
          changeHandler={(val) => setIsName(val)}
          value={isName}
        />
        <TextInput
          name={'address'}
          id={'address'}
          placeholder={'Address'}
          changeHandler={(val) => setIsAddress(val)}
          value={isAddress}
        />
        <TextInput
          name={'addressExtra'}
          id={'addressExtra'}
          placeholder={'AddressExtra'}
          changeHandler={(val) => setIsAddressExtra(val)}
          value={isAddressExtra}
        />
        <div className='flex items-center justify-end gap-3 pt-5'>
          <div
            className='px-4 py-1 bg-black text-white cursor-pointer'
            onClick={locationSubmitHandler}
          >
            {isLoading ? 'Sending...' : isSubmitted ? 'Submitted' : 'Submit'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewLocation;
