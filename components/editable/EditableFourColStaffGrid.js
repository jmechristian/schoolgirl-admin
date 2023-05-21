import React, { useState, useEffect } from 'react';
import { EditableStaffItem } from './EditableStaffItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableFourColStaffGrid = ({
  items,
  headline,
  itemTextStyle,
  background,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffHeadshot, setNewStaffHeadshot] = useState('');
  const [newStaffTitle, setNewStaffTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const addNewStaff = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('staff').insert([
      {
        headshot: newStaffHeadshot,
        name: newStaffName,
        title: newStaffTitle,
      },
    ]);

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <HeadlineMotion>{headline}</HeadlineMotion>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-9 overflow-hidden'>
        {items &&
          items
            .sort((a, b) => a.id - b.id)
            .map((it, i) => (
              <div key={it.id}>
                <EditableStaffItem
                  image={it.headshot}
                  alt={it.name}
                  headline={it.name}
                  text={itemTextStyle}
                  background={background}
                  link={it.link}
                  job={it.title ? it.title : ''}
                  id={it.id}
                />
              </div>
            ))}
        <div className='w-full h-full border border-dashed border-slate-500 flex flex-col justify-center items-center'>
          <div className='bg-white/80 p-3 max-w-3xl w-full h-full flex justify-center items-center'>
            <form
              className='flex flex-col gap-4 w-full'
              onSubmit={(event) => addNewStaff(event)}
            >
              <div className='grid grid-cols-1 gap-3'>
                <TextInput
                  type='text'
                  name='headshot URL'
                  id='headshot_URL'
                  placeholder='new headshot URL...'
                  value={newStaffHeadshot}
                  changeHandler={(val) => setNewStaffHeadshot(val)}
                />
                <TextInput
                  type='text'
                  name='Staff Name'
                  id='Staff_Name'
                  placeholder='new Staff Name...'
                  value={newStaffName}
                  changeHandler={(val) => setNewStaffName(val)}
                />
                <TextInput
                  type='text'
                  name='Title'
                  id='Title'
                  placeholder='new Title...'
                  value={newStaffTitle}
                  changeHandler={(val) => setNewStaffTitle(val)}
                />
              </div>
              <div className='flex justify-between items-center w-full'>
                <div className='flex justify-end items-center mt-4 gap-4'>
                  <div className='font-medium text-green-700 text-lg'>
                    {isSubmitted && (
                      <div className='flex items-center gap-1 text-green-700'>
                        <CheckCircleIcon className='w-7 h-7 fill-green-700' />
                        Updated!
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex justify-end items-center mt-4 gap-4'>
                  <button
                    className='bg-black rounded-lg px-4 py-2'
                    type='submit'
                  >
                    <div className='text-white font-bold'>
                      {isLoading ? 'Sending...' : 'Add Staff'}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableFourColStaffGrid;
