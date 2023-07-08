import React, { useEffect, useState } from 'react'
import {IoChevronBack} from 'react-icons/io5'
import styles from '../styles/BackButton.module.scss'
import Link from 'next/link'
import {  AnimatePresence, motion } from "framer-motion"

const BackButton = () => {

  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      console.log(scrollY)
      if (scrollY > 620) {
        setShowElement(true);
      }
      if (scrollY < 620) {
        setShowElement(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <AnimatePresence>
    { showElement &&
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{ease:"easeIn", delay:0.5}}
    >
    <Link href={'/'} className={styles.container}>
        <IoChevronBack/>
        <div>Back</div>
    </Link>
    </motion.div>
    }
    </AnimatePresence>
  )
}

export default BackButton;