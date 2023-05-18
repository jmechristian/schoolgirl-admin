import React, { useState } from 'react';
import { EditableFlexGridItem } from './EditableFlexGridItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableThreeColumWithHeadline = ({
  id,
  items,
  itemTextStyle,
  headline,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log(id);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('site_row')
      .update({
        title: isHeadline,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
    console.log('data', id);
  };

  return (
    <div className='w-full flex flex-col gap-8 justify-center items-center'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light'>
        <div className='flex flex-col'>
          <div className='flex gap-6'>
            <HeadlineMotion>{isHeadline}</HeadlineMotion>
            <div onClick={() => setIsEditing(!isEditing)}>
              <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
            </div>
          </div>
          {isEditing && (
            <form
              className='grid gap-2 items-center w-full'
              onSubmit={(e) => headlineSubmitHandler(e)}
            >
              <TextInput
                type='text'
                id='headline'
                value={isHeadline}
                changeHandler={(val) => setIsHeadline(val)}
              />
              <button
                type='submit'
                className={`${
                  isSubmitted ? 'bg-green-700' : 'bg-black'
                } rounded-lg text-white font-medium text-sm p-2 font-brown`}
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
      </div>
      <div className='grid md:grid-cols-3 w-full max-w-7xl px-6 sm:px-0 mx-auto gap-12 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={it.headline}>
              <EditableFlexGridItem
                image={it.image}
                alt={it.title}
                headline={it.title}
                text={itemTextStyle}
                subheadline={it.subheadline}
                link={it.link}
                id={it.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditableThreeColumWithHeadline;
