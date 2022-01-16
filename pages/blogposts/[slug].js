import {createClient} from 'contentful'
import Image from 'next/image'
import styles from '../../styles/Slug.module.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

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

export default function RecipeDetails({blogPost}) {

  if (!blogPost) return <div>Loading....</div>
  const {featuredImage, title, content, tags, description} = blogPost.fields

  //console.log(blogPost)

    return (

      <div>
        <div className={styles.blogheader}>
          <h2 className={styles.titlex}>{title}</h2>
          <div className={styles.postdetails}>
            <div className={styles.blogauthor}>
                <span>Shishir Timalsina</span><br/>
                Full Stack Web developer
            </div>
            
            <div>
              {tags.map(tag => (
                <div className={styles.tag}>
                  {tag}
                </div>
              ))}
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
        </div>
        
      </div>
    )
  }