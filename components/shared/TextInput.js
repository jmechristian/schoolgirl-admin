import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default function TextInput({
  type,
  name,
  id,
  placeholder,
  value,
  changeHandler,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='block font-medium text-sm capitalize leading-6 text-gray-900'
      >
        {name}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <input
          type={type}
          onChange={(e) => changeHandler(e.target.value)}
          name={name}
          id={id}
          className='block w-full rounded-md border-0 pl-3 py-1.5 pr-10 text-slate-600 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
          placeholder={placeholder}
          defaultValue={value}
          aria-invalid='true'
          aria-describedby='email-error'
        />
      </div>
    </div>
  );
}
