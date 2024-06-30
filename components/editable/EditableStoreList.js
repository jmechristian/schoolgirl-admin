import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';
import EditableDummyBlock from './EditableDummyBlock';
import AddNewLocation from './AddNewLocation';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const DummyBlock = ({ locations }) => {
  return locations.map((loc, index) => (
    <div className='flex flex-col gap-1' key={loc.name}>
      <div className='text-gray-500 font-brown-bold'>{loc.name}</div>
      <div className='flex flex-col'>
        <div className='text-gray-500 font-brown'>{loc.address}</div>
        <div className='text-gray-500 font-brown'>{loc.address_extra}</div>
      </div>
    </div>
  ));
};

const EditableStoreList = ({ headline, locations }) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('visit')
      .update({ stores_headline: isHeadline })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className='bg-light-grey w-full h-full py-16 md:py-24'>
      <div className='max-w-6xl px:6 lg:px-0 flex flex-col gap-16 mx-auto'>
        <div className='text-3xl md:text-5xl px-6 text-center font-canela font-light max-w-3xl mx-auto w-full flex flex-col gap-3'>
          <div className='flex gap-6'>
            <div className='w-full text-center'>{isHeadline}</div>
            <div onClick={() => setIsEditing(!isEditing)}>
              <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
            </div>
          </div>
          {isEditing && (
            <form
              className=' w-full'
              onSubmit={(e) => headlineSubmitHandler(e)}
            >
              <TextInput
                type='text'
                id='headline'
                placeholder={'Enter new headline'}
                value={isHeadline}
                changeHandler={(val) => setIsHeadline(val)}
              />

              <button
                type='submit'
                className={`${
                  isSubmitted ? 'bg-green-700' : 'bg-black'
                } rounded-lg text-white font-medium text-sm p-2 font-brown col-span-2 w-full`}
              >
                {isLoading
                  ? 'Sending....'
                  : isSubmitted
                  ? 'Updated!'
                  : 'Update'}
              </button>
            </form>
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <EditableDummyBlock locations={locations} />
          <AddNewLocation />
        </div>
      </div>
    </div>
  );
};

export default EditableStoreList;
