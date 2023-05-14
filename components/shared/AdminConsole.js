const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
const projects = [
  {
    id: 1,
    name: 'GraphQL API',
    href: '#',
    status: 'Complete',
    createdBy: 'Leslie Alexander',
    dueDate: 'March 17, 2023',
    dueDateTime: '2023-03-17T00:00Z',
  },
  {
    id: 2,
    name: 'New benefits plan',
    href: '#',
    status: 'In progress',
    createdBy: 'Leslie Alexander',
    dueDate: 'May 5, 2023',
    dueDateTime: '2023-05-05T00:00Z',
  },
  {
    id: 3,
    name: 'Onboarding emails',
    href: '#',
    status: 'In progress',
    createdBy: 'Courtney Henry',
    dueDate: 'May 25, 2023',
    dueDateTime: '2023-05-25T00:00Z',
  },
  {
    id: 4,
    name: 'iOS app',
    href: '#',
    status: 'In progress',
    createdBy: 'Leonard Krasner',
    dueDate: 'June 7, 2023',
    dueDateTime: '2023-06-07T00:00Z',
  },
  {
    id: 5,
    name: 'Marketing site redesign',
    href: '#',
    status: 'Archived',
    createdBy: 'Courtney Henry',
    dueDate: 'June 10, 2023',
    dueDateTime: '2023-06-10T00:00Z',
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
        className='divide-y divide-gray-100 max-w-4xl mx-auto px-6 md:px-16 py-9 bg-slate-100 shadow-lg rounded-xl'
      >
        {projects.map((project) => (
          <li
            key={project.id}
            className='flex items-center justify-between gap-x-6 py-5'
          >
            <div className='min-w-0'>
              <div className='flex items-start gap-x-3'>
                <p className='text-lg font-semibold leading-6 text-gray-900'>
                  {project.name}
                </p>
              </div>
              <div className='mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
                <p className='whitespace-nowrap'>
                  Due on{' '}
                  <time dateTime={project.dueDateTime}>{project.dueDate}</time>
                </p>
              </div>
            </div>
            <div className='flex flex-none items-center gap-x-4'>
              <a
                href={project.href}
                className='hidden rounded-md bg-brand-red px-3 py-2 text-lg font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block'
              >
                Edit Page<span className='sr-only'>, {project.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
