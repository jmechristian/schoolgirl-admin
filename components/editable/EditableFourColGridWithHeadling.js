import React, { useState } from 'react';
import EditableGridItem from './EditableGridItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '../shared/TextInput';

const EditableFourColGridWithHeading = ({
  items,
  headline,
  itemTextStyle,
  background,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light pb-2 mb-2'>
        <div className='flex flex-col'>
          <div className='flex gap-6'>
            <HeadlineMotion>{isHeadline}</HeadlineMotion>
            <div onClick={() => setIsEditing(!isEditing)}>
              <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
            </div>
          </div>
          {isEditing && (
            <form className='grid gap-2 items-center w-full'>
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
      <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-9 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={i}>
              <EditableGridItem
                image={it.image}
                alt={it.title}
                headline={it.title}
                text={itemTextStyle}
                background={background}
                link={it.link}
                job={it.job ? it.job : ''}
                id={it.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditableFourColGridWithHeading;
