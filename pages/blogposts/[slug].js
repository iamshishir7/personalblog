import {createClient} from 'contentful'
import Image from 'next/image'
import styles from '../../styles/Slug.module.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineFacebook} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import Head from 'next/head'

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

  if (!blogPost) return <div>Loading....</div>
  const {featuredImage, title, content, tags, description} = blogPost.fields

  //console.log(blogPost)

  var tagkey = 0;

    return (

      <div>
        <Head>
           <title>{title}</title>
        </Head>
        <div className={styles.blogheader}>
          <h2 className={styles.titlex}>{title}</h2>
          <div className={styles.postdetails}>
            <div className={styles.blogauthor}>
                <span>Shishir Timalsina</span><br/>
                Full Stack Web developer
            </div>
            <div className={styles.socials}>
              <a href='https://instagram.com/shishir.codes'><AiOutlineInstagram size={40}/></a>
              <a href='https://facebook.com/iamshishir7'><AiOutlineFacebook size={40}/></a>
              <a href='https://twitter.com/iamshishir7'><AiOutlineTwitter size={40}/></a>
            </div>
          </div>
         
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
              <h4>Tags</h4>
                  {tags}
            </div>
            
        </div>
        
      </div>
    )
  }