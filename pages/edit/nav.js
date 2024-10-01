import React, { useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from '../../components/shared/Logo';
import HeadlineMotion from '../../components/shared/HeadlineMotion';
import { supabase } from '../../lib/API';
import { useRouter } from 'next/router';

const Page = ({ navigation }) => {
  const [nav, setNav] = useState(navigation);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleInputChange = (id, field, value) => {
    setNav((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    const data = await nav.forEach(async (item) => {
      const { data, error } = await supabase
        .from('navigation')
        .update({
          name: item.name,
          link: item.link,
          order: item.order,
        })
        .eq('id', item.id)
        .select();
    });
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className='pt-16 pb-28 '>
      <div className='max-w-[1400px] mx-auto aspect-video border-8 border-brand-red flex flex-col overflow-hidden shadow-md relative'>
        <Popover className='relative bg-white'>
          <div className='flex items-center justify-between p-6 xl:py-9 xl:justify-start xl:space-x-10 max-w-7xl mx-auto'>
            <div className='flex justify-start items-center lg:w-0 lg:flex-1'>
              <Link href='/'>
                <span className='sr-only'>Schoolgirl Style</span>
                <div className='fill-gray-900 stroke-gray-900 stroke-1 w-48 sm:w-60 md:w-72 lg:w-80 block'>
                  <Logo />
                </div>
              </Link>
            </div>
            <div className='-my-2 -mr-2 xl:hidden'>
              <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                <span className='sr-only'>Open menu</span>
                <Bars3Icon
                  className='h-6 w-6 md:h-8 md:w-8'
                  aria-hidden='true'
                />
              </Popover.Button>
              <Popover.Overlay className='fixed inset-0 bg-black opacity-50 z-[60]' />
            </div>
            <nav className='hidden space-x-7 xl:space-x-12 xl:flex uppercase'>
              {nav
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className={`font-medium ${
                      router.route === item.link
                        ? 'text-brand-red font-bold font-brown-bold'
                        : 'text-gray-500 font-brown'
                    } hover:text-gray-900  tracking-wider text-sm`}
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute inset-x-0 z-[70] top-0 origin-top-right transform p-2 transition xl:hidden'
            >
              <div className='divide-white/40 rounded-lg bg-light-grey shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='px-5 pt-5 pb-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Logo />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white/40 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className='py-6 px-5'>
                  <div className='grid grid-cols-1 gap-3'>
                    {nav
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <Popover.Button
                          key={item.id}
                          as={Link}
                          href={item.link}
                          className='font-canela text-5xl text-gray-700'
                        >
                          <HeadlineMotion>{item.name}</HeadlineMotion>
                        </Popover.Button>
                      ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div className='flex flex-col gap-16'>
          <div>
            <div className='w-full bg-gray-200 h-[400px] max-w-7xl mx-auto'></div>
          </div>

          <div className='w-full max-w-7xl mx-auto grid grid-cols-4 gap-16'>
            <div className='bg-gray-200 aspect-square w-full'></div>
            <div className='bg-gray-200 aspect-square w-full'></div>
            <div className='bg-gray-200 aspect-square w-full'></div>
            <div className='bg-gray-200 aspect-square w-full'></div>
          </div>
        </div>
        <div className='absolute bottom-0 inset-x-0 w-full bg-black/70 p-4 flex justify-end space-x-4'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded'
            onClick={() => setIsModalOpen(true)}
          >
            Edit Navigation
          </button>
          {/* <button className='bg-green-500 hover:bg-green-600 text-lg text-white font-bold py-2 px-5 rounded'>
            Save
          </button> */}
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-gray-200 p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto'>
              <h2 className='text-2xl font-bold mb-4'>Edit Navigation</h2>
              {nav.map((item) => (
                <div key={item.id} className='mb-6 p-4 border rounded bg-white'>
                  <div className='mb-4'>
                    <label className='block text-xs font-brown-bold text-brand-red uppercase'>
                      Name
                    </label>
                    <input
                      type='text'
                      value={item.name}
                      onChange={(e) =>
                        handleInputChange(item.id, 'name', e.target.value)
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-xs font-brown-bold text-brand-red uppercase'>
                      Link
                    </label>
                    <input
                      type='text'
                      value={item.link}
                      onChange={(e) =>
                        handleInputChange(item.id, 'link', e.target.value)
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-brown-bold text-brand-red uppercase'>
                      Order
                    </label>
                    <input
                      type='number'
                      value={item.order}
                      onChange={(e) =>
                        handleInputChange(
                          item.id,
                          'order',
                          parseInt(e.target.value)
                        )
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                  </div>
                </div>
              ))}
              <div className='flex justify-end mt-4'>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2'
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let { data: navigation, error } = await supabase
    .from('navigation')
    .select('*');

  return {
    props: {
      navigation,
    },
  };
}

export default Page;
