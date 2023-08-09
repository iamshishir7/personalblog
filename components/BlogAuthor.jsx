import React from "react";
import styles from '../styles/blogAuthor.module.scss'
import Link from "next/link";
import Image from 'next/image'
import { isMobile } from 'react-device-detect';
import { Instagram, Linkedin, Twitter } from "lucide-react";

const BlogAuthor = ({author, caption}) => {
  return (
    <div className={styles.blogauthor}>
      <div className={styles.authorname}>
          <Image className={styles.image} src={'/shishir.jpg'} alt="shishir" width={isMobile ? 80 : 130 } height={ isMobile? 80: 130} />
          <div>
          <span>{author}</span>
          <br/>
          {caption}
          </div>
      </div>

      <div className={styles.socials}>
        
        <Link
          className={styles.fb}
          href="https://linkedin.com/in/iamshishir7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={30} />
        </Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Link
          className={styles.tw}
          href="https://twitter.com/iamshishir7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter size={30} />
        </Link>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Link
          className={styles.ig}
          href="https://instagram.com/sisir.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={30} />
        </Link>
      </div>
    </div>
  );
};

export default BlogAuthor;
