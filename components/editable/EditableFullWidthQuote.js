import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  CloudArrowUpIcon,
  CheckIcon,
  ExclamationCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableFullWidthQuote = ({ quote, author, table, id }) => {
  const [isQuote, setIsQuote] = useState(quote && quote);
  const [isAuthor, setIsAuthor] = useState(author && author);
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const quoteSubmit = async () => {
    setIsError(false);
    setIsSuccess(false);
    setIsSending(true);
    const { data, error } = await supabase
      .from(`${table}`)
      .update({
        blog_quote: isQuote,
        quote_author: isAuthor.toUpperCase(),
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsSending(false);
      setIsSuccess(true);
    } else if (error) {
      setIsSending(false);
      setIsError(true);
    }
  };

  return (
    <div className='w-full h-full py-32 bg-light-grey'>
      <div className='max-w-5xl mx-auto flex flex-col px-12 text-center relative'>
        <div className='absolute top-0 -right-20 z-10'>
          <div className='w-20 flex flex-col gap-2'>
            <div
              className='w-16 h-16 rounded-full bg-black flex justify-center items-center cursor-pointer'
              onClick={quoteSubmit}
            >
              <div>
                <CloudArrowUpIcon
                  className={`${
                    isSending ? 'stroke-white/90' : 'stroke-white'
                  } h-9 w-9`}
                />
              </div>
            </div>
            <div
              className={`w-16 h-16 rounded-full flex justify-center items-center cursor-pointer ${
                isSuccess
                  ? 'bg-green-500'
                  : isError
                  ? 'bg-red-500'
                  : 'bg-neutral-300'
              }`}
            >
              <div>
                {isSuccess ? (
                  <CheckIcon className='w-9 h-9 stroke-white' />
                ) : isError ? (
                  <ExclamationCircleIcon className='w-9 h-9 stroke-white' />
                ) : (
                  <SignalIcon
                    className={`${
                      isSending
                        ? 'text-black animate-pulse'
                        : 'stroke-neutral-400'
                    } w-9 h-9`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <textarea
          rows={3}
          onChange={(e) => setIsQuote(e.target.value)}
          className='text-brand-red text-4xl lg:text-6xl font-scarlet leading-tight bg-transparent p-6 text-center [word-spacing:10px]'
          value={isQuote}
        />
        <input
          type='text'
          name='author'
          id='author'
          placeholder='Enter Author'
          value={isAuthor}
          onChange={(e) => setIsAuthor(e.target.value)}
          className='text-gray-500 font-sweet tracking-wider mt-12 text-lg uppercase text-center py-3 bg-transparent'
        />
      </div>
    </div>
  );
};

export default EditableFullWidthQuote;
