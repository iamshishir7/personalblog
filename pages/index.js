
import styles from '../styles/Home.module.scss'
import {createClient} from 'contentful'
import Pagecard from '../components/pagecard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'blogPost'})


  return { 
    props: { blogPosts: res.items },
    revalidate: 1
 
  }

  
  
}



export default function blogPosts( blogPosts ) {
  //console.log(blogPosts)

  return (
    <div className={styles.bloglist}>
      {blogPosts.blogPosts.map(blogPost => (
      <Pagecard key={blogPost.sys.id} blogPost={blogPost}/>
    ))}
      
    </div>
  )
}

