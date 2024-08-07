import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createClient } from '@supabase/supabase-js';
import TextInput from '../shared/TextInput';
import { XMarkIcon } from '@heroicons/react/24/outline';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableHero = ({
  id,
  side,
  heading,
  headingColor,
  headline,
  subtext,
  buttonText,
  buttonColor,
  bg,
  textSide,
  textColor,
  link,
  bodyColor,
  buttonTextColor,
  theme,
}) => {
  const heroRef = useRef();
  const inView = useInView(heroRef);

  const [isHeading, setIsHeading] = useState(heading && heading);
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [isSubtext, setIsSubtext] = useState(subtext && subtext);
  const [isButtonText, setIsButtonText] = useState(buttonText && buttonText);
  const [isBg, setIsBg] = useState(bg && bg);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(link && link);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isTheme, setIsTheme] = useState({});
  const [isTextColor, setIsTextColor] = useState(textColor && textColor);
  const [isButtonColor, setIsButtonColor] = useState(
    buttonColor && buttonColor
  );
  const [isButtonTextColor, setIsButtonTextColor] = useState(
    buttonTextColor && buttonTextColor
  );

  const router = useRouter();

  const getTheme = (theme) => {
    switch (theme) {
      case 'black':
        return setIsTheme({
          color: 'black',
          headlineColor: 'text-gray-900',
          buttonColor: 'bg-gray-900',
          buttonText: 'text-white',
        });
      case 'gray':
        return setIsTheme({
          color: 'gray',
          headlineColor: 'text-gray-700',
          buttonColor: 'bg-gray-700',
          buttonText: 'text-white',
        });
      case 'white':
        return setIsTheme({
          color: 'white',
          headlineColor: 'text-white',
          buttonColor: 'bg-white',
          buttonText: 'text-gray-700',
        });
      case 'brand':
        return setIsTheme({
          color: 'brand',
          headlineColor: 'text-brand-red',
          buttonColor: 'bg-brand-red',
          buttonText: 'text-white',
        });
      case 'salmon':
        return setIsTheme({
          color: 'salmon',
          headlineColor: 'text-salmon',
          buttonColor: 'bg-salmon',
          buttonText: 'text-white',
        });
      case 'green':
        return setIsTheme({
          color: 'green',
          headlineColor: 'text-sweet-green',
          buttonColor: 'bg-sweet-green',
          buttonText: 'text-white',
        });
      case 'brown':
        return setIsTheme({
          color: 'brown',
          headlineColor: 'text-neutral-brown',
          buttonColor: 'bg-neutral-brown',
          buttonText: 'text-white',
        });
      default:
        setIsTheme({
          color: 'black',
          headlineColor: 'text-black',
          buttonColor: 'bg-black',
          buttonText: 'text-white',
        });
    }
  };

  useEffect(() => {
    getTheme(theme);
  }, [theme]);

  const variants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  const heroSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('hero')
      .update({
        heading: isHeading,
        headline: isHeadline,
        subheadline: isSubtext,
        cta_text: isButtonText,
        cta_link: isLink,
        image: isBg,
        theme: isTheme.color,
      })
      .eq('id', id)
      .select();

    if (!error) {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full relative h-full'
        initial='hide'
        variants={variants}
        animate={inView ? 'show' : 'hide'}
        ref={heroRef}
      >
        {isEditing && (
          <motion.div className='absolute z-30 top-0 left-0 bottom-0 right-0 bg-black/40 backdrop-blur flex justify-center items-center py-8'>
            <motion.div className='bg-white/80 max-w-3xl w-full h-full rounded-lg p-9 flex justify-center items-center'>
              <motion.form
                className='flex flex-col gap-3 w-full'
                onSubmit={(event) => heroSubmitHandler(event)}
              >
                <motion.div className='grid grid-cols-2 gap-6'>
                  <TextInput
                    type='text'
                    name='heading'
                    id='heading'
                    placeholder='new heading...'
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
                </motion.div>
                <TextInput
                  type='text'
                  name='subheadline'
                  id='subheadline'
                  placeholder='new subheadline...'
                  value={isSubtext}
                  changeHandler={(val) => setIsSubtext(val)}
                />
                <TextInput
                  type='text'
                  name='image'
                  id='image'
                  placeholder='new image...'
                  value={isBg}
                  changeHandler={(val) => setIsBg(val)}
                />
                <motion.div className='grid grid-cols-2 gap-6'>
                  <TextInput
                    type='text'
                    name='CTA'
                    id='CTA'
                    placeholder='new cta...'
                    value={isButtonText}
                    changeHandler={(val) => setIsButtonText(val)}
                  />
                  <div>
                    <label
                      htmlFor={'theme'}
                      className='block font-medium text-sm capitalize leading-6 text-gray-900'
                    >
                      Theme
                    </label>
                    <div className='relative mt-1 rounded-md w-full grid grid-cols-7 gap-3'>
                      <div
                        className='aspect-[1] bg-gray-900 rounded-full flex justify-center items-center'
                        onClick={() => getTheme('black')}
                      >
                        {isTheme.color === 'black' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-gray-700 rounded-full flex justify-center items-center'
                        onClick={() => getTheme('gray')}
                      >
                        {isTheme.color === 'gray' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-brand-red rounded-full flex justify-center items-center'
                        onClick={() => getTheme('brand')}
                      >
                        {isTheme.color === 'brand' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-salmon rounded-full flex justify-center items-center'
                        onClick={() => getTheme('salmon')}
                      >
                        {isTheme.color === 'salmon' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-neutral-brown rounded-full flex justify-center items-center'
                        onClick={() => getTheme('brown')}
                      >
                        {isTheme.color === 'brown' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-sweet-green rounded-full flex justify-center items-center'
                        onClick={() => getTheme('green')}
                      >
                        {isTheme.color === 'green' ? (
                          <XMarkIcon className='w-5 h-5 text-white' />
                        ) : (
                          ''
                        )}
                      </div>
                      <div
                        className='aspect-[1] bg-white rounded-full flex justify-center items-center'
                        onClick={() => getTheme('white')}
                      >
                        {isTheme.color === 'white' ? (
                          <XMarkIcon className='w-5 h-5 text-black' />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
                <TextInput
                  type='text'
                  name='link'
                  id='link'
                  placeholder='new link...'
                  value={isLink}
                  changeHandler={(val) => setIsLink(val)}
                />
                <motion.div className='flex justify-between items-center w-full'>
                  <motion.div className='flex justify-end items-center mt-4 gap-4'>
                    <motion.div className='font-medium text-green-700 text-lg'>
                      {isSubmitted && (
                        <div className='flex items-center gap-1 text-green-700'>
                          <CheckCircleIcon className='w-7 h-7 fill-green-700' />
                          Updated!
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                  <motion.div className='flex justify-end items-center mt-4 gap-4'>
                    <motion.div
                      className='bg-black/40 rounded-lg px-4 py-2'
                      onClick={() => setIsEditing(false)}
                    >
                      <motion.div className='text-white font-bold cursor-pointer'>
                        Close
                      </motion.div>
                    </motion.div>
                    <motion.button
                      className='bg-black rounded-lg px-4 py-2'
                      type='submit'
                    >
                      <motion.div className='text-white font-bold'>
                        {isLoading ? 'Sending...' : 'Update'}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
        <motion.div className='absolute left-28 bottom-5 z-50 shadow-lg w-16 h-16 rounded-full bg-black ring-2 ring-white flex items-center justify-center cursor-pointer'>
          <motion.div onClick={() => setIsEditing(true)} className='max-w-7xl'>
            <PencilSquareIcon className='w-7 h-7 fill-white' />
          </motion.div>
        </motion.div>
        <motion.div
          className={`absolute bottom-0 right-0 left-0 w-full h-full bg-gradient-to-r via-white/80 from-white/30 to-white/30 ${side} md:from-white md:to-white/10 z-10 `}
        ></motion.div>
        <motion.div
          className={`h-96 relative md:h-[543px] flex max-w-[1440px] mx-auto bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${isBg})` }}
        >
          <motion.div
            className={`absolute w-[300px] md:h-[543px] flex justify-center items-center top-0 bottom-0 ${textSide} z-20`}
          >
            <motion.div className='flex flex-col max-w-screen-xs text-center gap-3'>
              <motion.div
                className={`font-sweet-bold uppercase tracking-widest text-xs ${
                  headingColor ? headingColor : 'text-gray-900'
                }`}
              >
                {isHeading}
              </motion.div>
              <motion.div
                className={`font-canela text-5xl md:text-7xl ${
                  isTheme && isTheme.headlineColor
                } md:leading-[0.9]`}
              >
                {isHeadline}
              </motion.div>
              <motion.div
                className={`font-brown ${bodyColor} px-4 text-sm md:text-base`}
              >
                {isSubtext}
              </motion.div>
              {buttonText && (
                <motion.button
                  className={`font-sweet-bold text-sm md:text-base tracking-widest uppercase mt-2 ${
                    isTheme && isTheme.buttonColor
                  } ${isTheme && isTheme.buttonText} py-3 px-5 w-fit mx-auto`}
                  onClick={() => window.open(link, '_blank')}
                >
                  {isButtonText}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditableHero;
