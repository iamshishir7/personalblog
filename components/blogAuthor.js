import React from "react";
import styles from '../styles/blogAuthor.module.scss'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image'
import { isMobile } from 'react-device-detect';

const BlogAuthor = ({author, caption}) => {
  return (
    <div className={styles.blogauthor}>
      <div className={styles.authorname}>
          <Image className={styles.image} src={'/shishir.png'} width={isMobile ? 95 : 145 } height={ isMobile? 100: 150} />
          <div>
          <span>{author}</span>
          <br/>
          {caption}
          </div>
      </div>

      <div className={styles.socials}>
        <Link
          className={styles.ig}
          href="https://instagram.com/sisir.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={40} />
        </Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Link
          className={styles.fb}
          href="https://facebook.com/iamshishir7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={40} />
        </Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Link
          className={styles.tw}
          href="https://twitter.com/iamshishir7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={40} />
        </Link>
      </div>
    </div>
  );
};

export default BlogAuthor;
