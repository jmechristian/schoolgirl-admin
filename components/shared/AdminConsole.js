import Link from 'next/link';

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
const projects = [
  {
    id: 0,
    name: 'Navigation',
    href: '/edit/nav',
  },
  {
    id: 1,
    name: 'Home',
    href: '/edit/home',
  },
  {
    id: 7,
    name: 'Shop',
    href: '/edit/shop',
  },
  {
    id: 2,
    name: 'Watch',
    href: '/edit/watch',
  },
  {
    id: 3,
    name: 'Visit',
    href: '/edit/visit',
  },
  {
    id: 4,
    name: 'Blog',
    href: '/edit/blog',
  },
  {
    id: 5,
    name: 'Giving Back',
    href: '/edit/giving',
  },
  {
    id: 6,
    name: 'About',
    href: '/edit/about',
  },
  {
    id: 7,
    name: 'Hey, Teach!',
    href: '/edit/heyteach',
  },
  {
    id: 8,
    name: 'Sort Sellers',
    href: '/edit/sort',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminConsole() {
  return (
    <div className='pt-16 pb-28'>
      <ul
        role='list'
        className='max-w-7xl grid grid-cols-4 gap-12 mx-auto px-6 md:px-16 py-12'
      >
        {projects.map((project) => (
          <li
            key={project.id}
            className='flex flex-col items-center justify-between gap-5 p-10 bg-slate-100 shadow-lg rounded-xl'
          >
            <div className='min-w-0'>
              <div className='flex items-start gap-x-3'>
                <p className='text-lg font-semibold leading-6 text-gray-900'>
                  {project.name}
                </p>
              </div>
            </div>
            <div className='flex flex-none items-center gap-x-4'>
              <Link
                href={project.href}
                className='hidden rounded-md bg-brand-red px-3 py-2 text-lg font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-black/70 sm:block'
              >
                Edit Page<span className='sr-only'>, {project.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
