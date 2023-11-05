import { FC } from 'react';
import Image from 'next/image';

import { Sidebar } from '@/components/sidebar';

import TestImage from '../../public/images/binnen/badkamers/Badkamer (bambou).jpg';

import classes from './page.module.scss';

const HomePage: FC = () => {
  return (
    <main>
      <Image src={TestImage} alt='badkamer' className={classes.image} />
      <Sidebar />
    </main>
  );
};

export default HomePage;
