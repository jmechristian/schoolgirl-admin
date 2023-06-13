import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TextInput from './TextInput';
import { getSearchPosts, getAllPostsForHome } from '../../lib/API';

export default function SearchPanel({ open, setClose }) {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [isSending, setIsSending] = useState(false);
  const [isResults, setIsResults] = useState([]);

  const searchClickHandler = async () => {
    console.log(searchTerm);
    setIsSending(true);
    const posts = await getSearchPosts(searchTerm);
    setIsResults(posts.posts.edges);
    console.log(posts.posts.edges);
    setIsSending(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[70]' onClose={setClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-light-grey px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6 w-full'>
                <TextInput
                  id='search'
                  placeholder={'Discover new inspiration....'}
                  changeHandler={(val) => setSearchTerm(val)}
                />
                <div className='mt-1 sm:mt-6'>
                  <div
                    className='font-sweet-bold text-sm md:text-base tracking-widest uppercase mt-2 bg-black text-white w-full px-3 py-2'
                    onClick={searchClickHandler}
                  >
                    {isSending ? 'Searching...' : 'Search Blogs'}
                  </div>
                  <div className='flex flex-col lg:grid lg:grid-cols-2 gap-6 divide-y divide-gray-300 text-left py-6'>
                    {isResults.map((post) => (
                      <div
                        key={post.node.slug}
                        className='flex flex-col gap-3 pt-6'
                      >
                        <div className='flex gap-3'>
                          <div>
                            <div
                              className='w-16 h-12 bg-black bg-cover bg-center'
                              style={{
                                backgroundImage: `url(${post.node.featuredImage?.node.sourceUrl})`,
                              }}
                            ></div>
                          </div>
                          <div className='font-brown-bold'>
                            {post.node.title}
                          </div>
                        </div>
                        <div className='font-brown line-clamp-3 text-sm'>
                          {post.node.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
