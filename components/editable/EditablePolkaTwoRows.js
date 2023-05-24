import React from 'react';
import EditablePolkaItemLeft from './EditablePolkaItemLeft';
import EditablePolkaItemRight from './EditablePolkaItemRight';

const EditablePolkaTwoRows = ({ items, table, id }) => {
  return (
    <div className='w-full h-full py-16 bg-polka bg-repeat bg-contain'>
      <div className='max-w-7xl mx-auto w-full h-full flex flex-col gap-12 px-6 px:0'>
        <EditablePolkaItemRight
          key={items[0].link}
          heading={items[0].heading}
          headline={items[0].headline}
          body={items[0].body}
          bodyCallout={items[0].bodyCallout}
          bground={items[0].background}
          cta={items[0].cta}
          button={items[0].button}
          link={items[0].link}
          fields={items[0].fields}
          tableName={table}
          id={id}
        />
        <EditablePolkaItemLeft
          heading={items[1].heading}
          headline={items[1].headline}
          body={items[1].body}
          bodyCallout={items[1].bodyCallout}
          bground={items[1].background}
          cta={items[1].cta}
          button={items[1].button}
          link={items[1].link}
          fields={items[1].fields}
          tableName={table}
          id={id}
        />
      </div>
    </div>
  );
};

export default EditablePolkaTwoRows;
