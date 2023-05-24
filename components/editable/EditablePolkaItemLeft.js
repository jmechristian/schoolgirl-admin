import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditablePolkaItemLeft = ({
  heading,
  headline,
  body,
  bodyCallout,
  cta,
  bground,
  button,
  link,
  tableName,
  fields,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(link && link);
  const [isHeading, setIsHeading] = useState(heading && heading);
  const [isBody, setIsBody] = useState(body && body);
  const [isBodyCallout, setIsBodyCallout] = useState(
    bodyCallout && bodyCallout
  );
  const [isBg, setIsBg] = useState(bground && bground);
  const [isCTA, setIsCTA] = useState(cta && cta);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const heroSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from(`${tableName}`)
      .update({
        [fields[0]]: isHeading,
        [fields[1]]: isHeadline,
        [fields[2]]: isBody,
        [fields[3]]: isBodyCallout,
        [fields[4]]: isLink,
        [fields[5]]: isCTA,
        [fields[6]]: isBg,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
    console.log('data', data);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-white md:min-h-[520px] relative'>
      {isEditing && (
        <div className='absolute z-30 top-0 left-0 bottom-0 right-0 bg-black/40 backdrop-blur flex justify-center items-center py-8'>
          <div className='bg-white/80 max-w-3xl w-full h-full rounded-lg p-9 flex justify-center items-center'>
            <form
              className='flex flex-col gap-4 w-full'
              onSubmit={(event) => heroSubmitHandler(event)}
            >
              <div className='grid grid-cols-2 gap-6'>
                <TextInput
                  type='text'
                  name='heading'
                  id='heading'
                  placeholder='new header...'
                  value={isHeading}
                  changeHandler={(val) => setIsHeading(val)}
                />
                <TextInput
                  type='text'
                  name='headline'
                  id='headline'
                  placeholder='new headline...'
                  value={isHeadline}
                  changeHandler={(val) => setIsHeadline(val)}
                />
              </div>
              <TextInput
                type='text'
                name='body'
                id='body'
                placeholder='new body...'
                value={isBody}
                changeHandler={(val) => setIsBody(val)}
              />
              <TextInput
                type='text'
                name='image'
                id='image'
                placeholder='new image...'
                value={isBg}
                changeHandler={(val) => setIsBg(val)}
              />
              <TextInput
                type='text'
                name='callout'
                id='callout'
                placeholder='new callout...'
                value={isBodyCallout}
                changeHandler={(val) => setIsBodyCallout(val)}
              />
              <div className='grid grid-cols-2 gap-6'>
                <TextInput
                  type='text'
                  name='Button Text'
                  id='button_text'
                  placeholder='new button text...'
                  value={isCTA}
                  changeHandler={(val) => setIsCTA(val)}
                />
                <TextInput
                  type='text'
                  name='link'
                  id='link'
                  placeholder='new link...'
                  value={isLink}
                  changeHandler={(val) => setIsLink(val)}
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
                  <div
                    className='bg-black/40 rounded-lg px-4 py-2'
                    onClick={() => setIsEditing(false)}
                  >
                    <div className='text-white font-bold cursor-pointer'>
                      Cancel
                    </div>
                  </div>
                  <button
                    className='bg-black rounded-lg px-4 py-2'
                    type='submit'
                  >
                    <div className='text-white font-bold'>
                      {isLoading ? 'Sending...' : 'Update'}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='absolute left-6 bottom-5 z-50 shadow-lg w-16 h-16 rounded-full bg-black ring-2 ring-white flex items-center justify-center cursor-pointer'>
        <div onClick={() => setIsEditing(true)} className='max-w-7xl'>
          <PencilSquareIcon className='w-7 h-7 fill-white' />
        </div>
      </div>
      <div
        className={`bg-cover bg-top aspect-square md:aspect-auto`}
        style={{ backgroundImage: `url(${isBg})` }}
      ></div>
      <div className='flex justify-center items-center gap-4 max-w-[496px] mx-auto'>
        <div className='flex flex-col col-span-1 max-w-screen-xs gap-4 px-6 mx-auto py-12 lg:py-16'>
          <div className='font-sweet-bold uppercase tracking-widest text-xs text-gray-900'>
            {isHeading}
          </div>
          <div className='font-canela text-5xl lg:text-7xl text-sweet-green leading-none'>
            {isHeadline}
          </div>
          <div className='font-brown text-gray-700 text-sm md:text-base'>
            {isBody}
          </div>
          <div className='font-brown-bold text-sweet-green text-sm md:text-base max-w-2xl'>
            {isBodyCallout}
          </div>
          {button && (
            <div
              className='font-sweet-bold text-sm md:text-base tracking-widest uppercase py-3 px-5 w-fit bg-sweet-green text-white cursor-pointer'
              onClick={() => window.open(isLink, '_blank')}
            >
              {isCTA}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditablePolkaItemLeft;
