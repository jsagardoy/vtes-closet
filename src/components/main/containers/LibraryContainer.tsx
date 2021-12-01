import React from 'react'
import { getLibrary } from '../../../types/library_type';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';

const LibraryContainer = () => {
    return (
      <div className='library__container'>
        <LibraryNavbarList list={getLibrary()} />
        <LibraryList list={getLibrary()}/>
      </div>
    );
}

export default LibraryContainer
