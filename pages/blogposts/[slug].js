import { useMemo } from 'react';
import {createClient} from 'contentful'
import Image from 'next/image'
import styles from '../../styles/Slug.module.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {FaInstagram} from 'react-icons/fa'
import {FaFacebook} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {AiOutlineTags} from 'react-icons/ai'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from 'react-share';
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

const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "blogPost") {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}>            {node.data.target.fields.title}
          </a>
        );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "codeBlock") {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"

            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
          className='image'
        />
      );
    },

    [INLINES.HYPERLINK]: node => {

      // Only process youtube links
      if (node.data.uri.includes("youtube.com")) {
          // Extract videoId from the URL
          const match = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/.exec(
              node.data.uri
          )
          const videoId =
              match && match[7].length === 11 ? match[7] : null
          return (
              videoId && (
              
                  <iframe
                      className="youtube-video"
                      style={{aspectRatio:'16 / 9', width: '100%'}}
                      title={`https://youtube.com/embed/${videoId}`}
                      src={`https://youtube.com/embed/${videoId}`}
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      frameBorder="0"
                      allowFullScreen
                  />
              
              )
          )
      } else {
        return <a href={node.data.uri} target="_blank" rel="noreferrer">{node.content[0].value}</a>
      }
    },
  },
};

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
                Web and Software developer
            </div>
            
            <div className={styles.socials}>

              <Link className={styles.ig} href='https://instagram.com/sisir.dev' target="_blank" rel="noopener noreferrer">
                <FaInstagram size={40}/>
              </Link>

              &nbsp;&nbsp;
              &nbsp;&nbsp;

              <Link className={styles.fb} href='https://facebook.com/iamshishir7' target="_blank" rel="noopener noreferrer"><FaFacebook size={40}/></Link>
              
              &nbsp;&nbsp;
              &nbsp;&nbsp;

              <Link className={styles.tw} href='https://twitter.com/iamshishir7' target="_blank" rel="noopener noreferrer"><FaTwitter size={40}/></Link>
            </div>
          </div>
          <div className={styles.date}><span>Published on <br/>{day}</span> - {dateonly}</div>
         
          <p>{description}</p>
        </div>
        
          <Image className={`image ${styles.bannerimage}`}
              src={'https:' + featuredImage.fields.file.url}
              width={featuredImage.fields.file.details.image.width}
              height={featuredImage.fields.file.details.image.height}
              
          />
        
        
        <div className={styles.content}>
            <div>{documentToReactComponents(content, renderOptions)}</div>

            <div className={styles.tagcontainer}>
              <p>Tags</p>
              <div className={styles.taglist}>
                    {
                      tags.map((tag,i) => (
                        <div className={styles.tag} key={i}><AiOutlineTags/>{tag}</div>
                      ))
                    }
              </div>
            </div>

            <div className={styles.sharecontainer}>
              <div>Share it on</div>
              <TwitterShareButton
                url={window.location.href}
                quote={'Shishir Blog'}
                hashtag="#blogpost"
              >
                <TwitterIcon size={35} round />
              </TwitterShareButton>

              <FacebookShareButton
                url={window.location.href}
                quote={'Shishir Blog!'}
                hashtag="#blogpost"
              >
                <FacebookIcon size={35} round />
              </FacebookShareButton>

              <WhatsappShareButton
                url={window.location.href}
                quote={'Shishir Blog'}
                hashtag="#blogpost"
              >
                <WhatsappIcon size={35} round />
              </WhatsappShareButton>

              <EmailShareButton
                url={window.location.href}
                quote={'Shishir Blog'}
                hashtag="#blogpost"
              >
                <EmailIcon size={35} round />
              </EmailShareButton>
            </div>
        </div>
        
      </motion.div>
    )
  }