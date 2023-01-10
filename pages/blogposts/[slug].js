import { useMemo } from 'react';
import {createClient} from 'contentful'
import Image from 'next/image'
import styles from '../../styles/Slug.module.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineFacebook} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
      const res = await client.getEntries({
        content_type: 'blogPost'
      })

      const paths = res.items.map(item => {
        return {
          params: {slug: item.fields.slug}
        }
      })

      return {
        paths,
        fallback: true
      }
}

export async function getStaticProps({params}) {
  const {items} = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug' : params.slug
  })
  
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { blogPost: items[0]},
    revalidate: 1
  }
  
}

export default function BlogDetails({blogPost}) {
  

  if (!blogPost) return (<div>Loading....</div>);

  const {featuredImage, title, content, tags, description, date} = blogPost.fields

  const dateparts = date.split('-');
  const convertdate = new Date(dateparts[0], dateparts[1] - 1, dateparts[2]).toDateString();
  const day = convertdate.slice(0, 3);
  const dateonly = convertdate.slice(4,10) + ", " + convertdate.slice(11,15);


  var tagkey = 0;

    return (

      <motion.div 
      initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:20}}
            transition={{ease:"easeIn", delay:0.05}}
      >
        <Head>
           <title>{title}</title>
        </Head>
        <div className={styles.blogheader}>
          <h2 className={styles.titlex}>{title}</h2>
          <div className={styles.postdetails}>
            <div className={styles.blogauthor}>
                <span>Shishir Timalsina</span><br/>
                Full Stack Web and Software developer
            </div>
            
            <div className={styles.socials}>

              <a className={styles.ig} href='https://instagram.com/shishir.codes' target="_blank" rel="noopener noreferrer">
                <AiOutlineInstagram size={40}/>
              </a>

              &nbsp;&nbsp;
              &nbsp;&nbsp;

              <a className={styles.fb} href='https://facebook.com/iamshishir7' target="_blank" rel="noopener noreferrer"><AiOutlineFacebook size={40}/></a>
              
              &nbsp;&nbsp;
              &nbsp;&nbsp;

              <a className={styles.tw} href='https://twitter.com/iamshishir7' target="_blank" rel="noopener noreferrer"><AiOutlineTwitter size={40}/></a>
            </div>
          </div>
          <div className={styles.date}><span>Published on <br/>{day}</span> - {dateonly}</div>
         
          <p>{description}</p>
        </div>
        <div className={styles.banner}>
          <Image className={styles.bannerimage}
              src={'https:' + featuredImage.fields.file.url}
              width={featuredImage.fields.file.details.image.width}
              height={featuredImage.fields.file.details.image.height}
              layout='responsive'
          />
        </div>
        
        <div className={styles.content}>
            <div>{documentToReactComponents(content)}</div>

            
            <div className={styles.tag}>
                  {tags}
            </div>
            
        </div>
        
      </motion.div>
    )
  }