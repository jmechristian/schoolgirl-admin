import React from 'react';
import { EditableFlexGridItem } from './EditableFlexGridItem';

const EditableThreeColGridNoHeading = ({ items, itemTextStyle }) => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='grid md:grid-cols-3 w-full max-w-7xl px-6 sm:px-0 mx-auto gap-12 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={i}>
              <EditableFlexGridItem
                image={it.image}
                alt={it.title}
                headline={it.title}
                text={itemTextStyle}
                subheadline={it.subheadline}
                link={it.link}
                id={it.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditableThreeColGridNoHeading;
