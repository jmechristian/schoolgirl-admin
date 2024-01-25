import React, { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
import {
  PencilSquareIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/solid';
import ScrollerItem from '../shared/ScrollerItem';
import HeadlineMotion from '../shared/HeadlineMotion';
import NewScroller from '../shared/NewScroller';
import TextInput from '../shared/TextInput';
import { createClient } from '@supabase/supabase-js';
import { getClassroomInspoPosts } from '../../lib/API';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const people = [
  { id: 1, name: 'Wade Cooper', online: true },
  { id: 2, name: 'Arlene Mccoy', online: false },
  { id: 3, name: 'Devon Webb', online: false },
  { id: 4, name: 'Tom Cook', online: true },
  { id: 5, name: 'Tanya Fox', online: false },
  { id: 6, name: 'Hellen Schmidt', online: true },
  { id: 7, name: 'Caroline Schultz', online: true },
  { id: 8, name: 'Mason Heaney', online: false },
  { id: 9, name: 'Claudie Smitham', online: true },
  { id: 10, name: 'Emil Schaefer', online: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EditableBlogCategoryScroller = ({
  itemTextStyle,
  headline,
  bookmark,
  background,
  category,
  categories,
  price,
}) => {
  const [isHeadline, setIsHeadline] = useState(headline && headline);
  const [items, setItems] = useState([]);
  const [isCategory, setIsCategory] = useState(category && category);
  const [isEditing, setIsEditing] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(category);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getClassroomInspoPosts(selected && selected);
      setItems(posts.nodes);
    };

    getPosts();
  }, [selected]);

  const headlineSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog')
      .update({ category_headline: isHeadline, category: selected })
      .eq('id', 1)
      .select();

    if (!error) {
      setIsLoading(false);
      setIsSubmitted(true);
    }
    console.log('data', data);
  };

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light max-w-3xl mx-auto w-full flex flex-col gap-3'>
        <div className='flex gap-6'>
          <div className='w-full text-center'>{isHeadline}</div>
          <div onClick={() => setIsEditing(!isEditing)}>
            <PencilSquareIcon className='w-7 h-7 fill-black mt-2' />
          </div>
        </div>
        {isEditing && (
          <form
            className='grid grid-cols-2 gap-2 items-center w-full'
            onSubmit={(e) => headlineSubmitHandler(e)}
          >
            <TextInput
              type='text'
              id='headline'
              placeholder={'Enter new headline'}
              value={isHeadline}
              changeHandler={(val) => setIsHeadline(val)}
            />
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className='relative self-center h-full flex'>
                    <Listbox.Button className='relative w-full cursor-default rounded-md bg-white mt-1 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6'>
                      <span className='flex items-center'>
                        <span>Current Category:</span>
                        <span className='ml-1 block truncate text-black'>
                          {selected}
                        </span>
                      </span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {categories.nodes.map((cat) => (
                          <Listbox.Option
                            key={cat.name}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={cat.name}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className='flex items-center'>
                                  <span
                                    className='flex tracking-tighter justify-center items-center h-6 w-6 rounded-full bg-black text-xs font-brown text-white'
                                    aria-hidden='true'
                                  >
                                    {cat.count}
                                  </span>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {cat.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <button
              type='submit'
              className={`${
                isSubmitted ? 'bg-green-700' : 'bg-black'
              } rounded-lg text-white font-medium text-sm p-2 font-brown col-span-2`}
            >
              {isLoading ? 'Sending....' : isSubmitted ? 'Updated!' : 'Update'}
            </button>
          </form>
        )}
      </div>
      <div className='flex gap-3 mx-auto max-w-[1440px] px-6 sm:px-0 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.title ? it.title : it.headline}
              >
                <ScrollerItem
                  image={
                    it.featuredImage
                      ? it.featuredImage.node.sourceUrl
                      : it.image
                  }
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  bookmark={bookmark}
                  price={it.price ? it.price : ''}
                  slug={it.slug ? it.slug : '/#'}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default EditableBlogCategoryScroller;
