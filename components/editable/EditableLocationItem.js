import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import TextInput from '../shared/TextInput';

const EditableLocationItem = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isName, setIsName] = useState(location && location.name);
  const [isAddress, setIsAddress] = useState(location && location.address);
  const [isAddressExtra, setIsAddressExtra] = useState(
    location && location.address_extra
  );
  const [safetyClick, setSafetyClick] = useState(false);

  const locationSubmitHandler = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('locations')
      .update({
        name: isName,
        address: isAddress,
        address_extra: isAddressExtra,
      })
      .eq('id', location.id)
      .select();
    setIsLoading(false);
    setSubmitted(true);
  };

  const deleteItemHandler = async () => {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', location.id);
    setSafetyClick(false);
  };

  return (
    <div className='w-full h-full border border-neutral-300 relative p-3'>
      {isEditing && (
        <div className='absolute inset-0 z-10 bg-neutral-300'>
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
                className='px-4 py-1 bg-black text-white cursor-pointer rounded'
                onClick={locationSubmitHandler}
              >
                {isLoading
                  ? 'Sending...'
                  : isSubmitted
                  ? 'Submitted'
                  : 'Submit'}
              </div>
              <div
                className='pl-2 py-1 text-red-500 cursor-pointer'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col'>
        <div className='font-brown-bold'>{isName}</div>
        <div className='font-brown text-sm'>{isAddress ? isAddress : ''}</div>
        <div className='font-brown text-sm'>
          {isAddressExtra ? isAddressExtra : <br />}
        </div>
        <div className='flex items-center justify-end gap-3 pt-40'>
          <div
            className='px-4 py-1 bg-black text-white cursor-pointer rounded'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </div>
          <div
            className='pl-2 py-1 text-red-500 cursor-pointer'
            onClick={() =>
              safetyClick ? deleteItemHandler() : setSafetyClick(true)
            }
          >
            {safetyClick ? 'CONFIRM' : 'DELETE'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableLocationItem;
