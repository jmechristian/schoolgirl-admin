import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const NewEditableInputItem = ({ id, value, link, order, table, setNew }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isValue, setIsValue] = useState(value);
  const [isLink, setIsLink] = useState(link);

  const deleteNavItemHandler = async () => {
    await supabase.from(table).delete().eq('id', id);
    setNew();
  };

  const addNavItemHandler = async () => {
    const isOrder = () => {
      switch (isLink) {
        case '#one':
          return 1;
        case '#two':
          return 2;
        case '#three':
          return 3;
        case '#four':
          return 4;
        case '#five':
          return 5;
        case '#six':
          return 6;
        case '#seven':
          return 7;
        case '#eight':
          return 8;
        case '#nine':
          return 9;
        case '#ten':
          return 10;
        default:
          return 1;
      }
    };

    await supabase
      .from(table)
      .update([{ value: isValue, link: isLink, order: isOrder() }])
      .eq('id', id);

    setIsEditing(false);
    setNew();
  };

  return (
    <>
      <div key={id} className='col-span-5'>
        {isEditing ? (
          <TextInput
            id={'value'}
            placeholder={'Enter Name'}
            value={isValue}
            changeHandler={(val) => setIsValue(val)}
          />
        ) : (
          <div className='font-sm font-brown text-gray-600 uppercase text-sm'>
            {value}
          </div>
        )}
      </div>
      <div className='col-span-5'>
        {isEditing ? (
          <select
            className='w-full h-full py-3 rounded-md border-0 pl-3 pr-10 text-slate-600 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
            onChange={(e) => setIsLink(e.target.value)}
            defaultValue='#one'
          >
            <option value='#one' className='uppercase'>
              #one
            </option>
            <option value='#two' className='uppercase'>
              #two
            </option>
            <option value='#three' className='uppercase'>
              #three
            </option>
            <option value='#four' className='uppercase'>
              #four
            </option>
            <option value='#five' className='uppercase'>
              #five
            </option>
            <option value='#six' className='uppercase'>
              #six
            </option>
            <option value='#seven' className='uppercase'>
              #seven
            </option>
            <option value='#eight' className='uppercase'>
              #eight
            </option>
            <option value='#nine' className='uppercase'>
              #nine
            </option>
            <option value='#ten' className='uppercase'>
              #ten
            </option>
          </select>
        ) : (
          <div className='font-sm font-brown text-gray-600 uppercase text-sm'>
            {link}
          </div>
        )}
      </div>
      {!isEditing ? (
        <div
          className='flex justify-center items-center w-6 h-6 rounded-full bg-red-500 col-span-1 cursor-pointer'
          onClick={deleteNavItemHandler}
        >
          <div>
            <XMarkIcon className='w-4 h-4 stroke-white' />
          </div>
        </div>
      ) : (
        <div
          className='flex justify-center items-center w-6 h-6 rounded-full col-span-1 cursor-pointer'
          onClick={addNavItemHandler}
        >
          <div>
            <PlusCircleIcon className='w-8 h-8 fill-indigo-600' />
          </div>
        </div>
      )}

      <div
        className='flex justify-center items-center w-6 h-6  bg-black col-span-1 cursor-pointer'
        onClick={() => setIsEditing(!isEditing)}
      >
        <div>
          <PencilIcon className='w-4 h-4 fill-white' />
        </div>
      </div>
    </>
  );
};

export default NewEditableInputItem;
