import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  CheckIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PencilSquareIcon, PencilIcon } from '@heroicons/react/24/solid';
import SearchPanel from '../shared/SearchPanel';
import EditableInputItem from './EditableInputItem';
import TextInput from '../shared/TextInput';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableInnerPageSubNav = ({ subNav, search }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSubnav, setIsSubnav] = useState(subNav && subNav);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [isItemValue, setIsItemValue] = useState('');
  const [isItemLink, setIsItemLink] = useState('');

  useEffect(() => {
    supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shop_subnav' },
        () => {
          getAndSetNewSubNav();
        }
      )
      .subscribe();
  });

  const getAndSetNewSubNav = async () => {
    const subnav = await supabase.from('shop_subnav').select('*');
    setIsSubnav(subnav.data);
  };

  const addLinkHandler = async () => {
    const isOrder = () => {
      switch (isItemLink) {
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
      .from('shop_subnav')
      .insert([{ value: isItemValue, link: isItemLink, order: isOrder() }]);
  };

  return (
    <div className='w-full flex justify-center gap-12 py-3 md:py-8 bg-khaki sticky top-0 z-[90] drop-shadow-sm'>
      <div
        className='flex lg:justify-center items-center gap-12 w-full max-w-7xl mx-auto px-6 overflow-auto relative'
        id='scrollers'
      >
        <div onClick={() => setIsEditing(!isEditing)}>
          <PencilSquareIcon className='w-5 h-5 fill-black' />
        </div>
        {isSubnav
          .sort((a, b) => a.order - b.order)
          .map((item, i) => (
            <div
              className='font-sm font-brown text-gray-600 uppercase text-sm'
              key={item.id}
            >
              <a href={item.link}>{item.value}</a>
            </div>
          ))}
        {search && (
          <div
            className='flex gap-2 items-center cursor-pointer'
            onClick={() => setSearchOpen(true)}
          >
            <MagnifyingGlassIcon className='w-5 h-5' />
            <div className='text-gray-600 uppercase text-sm'>Search</div>
          </div>
        )}
      </div>
      {isEditing && (
        <div className='absolute z-[70] right-0 top-0 w-[450px] bg-slate-100 rounded-bl-lg p-9'>
          <div className='w-full h-full grid grid-cols-12 gap-6 items-center'>
            {isSubnav
              .sort((a, b) => a.order - b.order)
              .map((item, i) => (
                <EditableInputItem
                  id={item.id}
                  value={item.value}
                  key={item.id}
                  link={item.link}
                />
              ))}
            {isSubnav.length < 10 && (
              <>
                <div className='col-span-5'>
                  <TextInput
                    id={'value'}
                    placeholder={'Enter Name'}
                    value={isItemValue}
                    changeHandler={(val) => setIsItemValue(val)}
                  />
                </div>
                <div className='col-span-5'>
                  <select
                    className='w-full h-full py-3 rounded-md border-0 pl-3 pr-10 text-slate-600 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
                    onChange={(e) => setIsItemLink(e.target.value)}
                    defaultValue={isItemLink}
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
                </div>
                <div
                  className=' col-span-2 w-full rounded-lg bg-indigo-600 h-full flex justify-center items-center text-white font-semibold cursor-pointer'
                  onClick={addLinkHandler}
                >
                  Add
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <SearchPanel open={searchOpen} setClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default EditableInnerPageSubNav;
