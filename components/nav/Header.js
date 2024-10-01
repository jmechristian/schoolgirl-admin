import { Fragment, useRef, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  Bars3Icon,
  XMarkIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from '../shared/Logo';
import HeadlineMotion from '../shared/HeadlineMotion';
import { supabase } from '../../lib/API';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();
  const [nav, setNav] = useState([]);

  useEffect(() => {
    const fetchNav = async () => {
      let { data: navigation, error } = await supabase
        .from('navigation')
        .select('*');
      setNav(navigation);
    };
    fetchNav();
  }, []);

  const variants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  return (
    <Popover className='relative bg-white'>
      <motion.div
        className='flex items-center justify-between p-6 xl:py-9 xl:justify-start xl:space-x-10 max-w-7xl mx-auto'
        variants={variants}
        initial='hide'
        animate='show'
      >
        <motion.div className='flex justify-start items-center lg:w-0 lg:flex-1'>
          <Link href='/'>
            <span className='sr-only'>Schoolgirl Style</span>
            <motion.div className='fill-gray-900 stroke-gray-900 stroke-1 w-48 sm:w-60 md:w-72 lg:w-80 block'>
              <Logo />
            </motion.div>
          </Link>
        </motion.div>
        <motion.div className='-my-2 -mr-2 xl:hidden'>
          <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
            <span className='sr-only'>Open menu</span>
            <Bars3Icon className='h-6 w-6 md:h-8 md:w-8' aria-hidden='true' />
          </Popover.Button>
          <Popover.Overlay className='fixed inset-0 bg-black opacity-50 z-[60]' />
        </motion.div>
        <nav className='hidden space-x-7 xl:space-x-12 xl:flex uppercase'>
          {nav &&
            nav
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
      </motion.div>

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
  );
}
