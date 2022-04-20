import React from 'react';
import MediaCard from '../MediaCard';
import './content.css';

interface Props {
  toogle: boolean;
}

const PublicMain = (props: Props) => {
  const { toogle } = props;

  return (
    <div className={toogle ? 'hidden__main__content' : 'main__content'}>
      <MediaCard title='Crypt' imageCardType='crypt' />
      <MediaCard title='Library' imageCardType='library' />
    </div>
  );
};

export default PublicMain;
