'use client';

import { FC } from 'react';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';

import { IMAGES } from '@/images';

import LogoImage from '../../../public/logo.png';
import { SawIcon } from '../sawicon';

import classes from './sidebar.module.scss';

const backgroundVariants = {
  open: {
    clipPath: `circle(200vh at 5vh 5vh)`,
    transition: {
      type: 'spring',
      stiffness: 30,
    },
  },
  closed: {
    clipPath: 'circle(3vh at 5vh 5vh)',
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 400,
    },
  },
};

const buttonVariants = {
  open: {
    rotate: 540,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
  closed: {
    rotate: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const logoVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const listVariants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};

export const Sidebar: FC = () => {
  const [openState, cycleOpenState] = useCycle('closed', 'open');

  return (
    <motion.aside initial={false} animate={openState}>
      <motion.div
        className={classes.background}
        variants={backgroundVariants}
      />
      <motion.button
        className={classes.toggle}
        variants={buttonVariants}
        onClick={() => cycleOpenState()}
      >
        <SawIcon />
      </motion.button>
      <motion.div className={classes.logo} variants={logoVariants}>
        <div>
          <Image src={LogoImage} alt='logo' fill objectFit='contain' />
        </div>
      </motion.div>
      {/* <motion.ul className={classes.list} variants={listVariants}>
        {Object.keys(IMAGES).map(cat => (
          <motion.li
            key={cat}
            variants={liVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.li>
        ))}
      </motion.ul> */}
    </motion.aside>
  );
};
