import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import EditableLocationItem from './EditableLocationItem';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EditableDummyBlock = ({ locations }) => {
  return locations.map((loc, index) => (
    <div className='w-full h-full' key={loc.id}>
      <EditableLocationItem location={loc} />
    </div>
  ));
};

export default EditableDummyBlock;
