
import styles from '../styles/Home.module.css'

import {createClient} from 'contentful'
import BlogCard from '../components/BlogCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'blogPost'})


  return { 
    props: { blogPosts: res.items },

 
  }

  
  
}



export default function blogPosts( blogPosts ) {
  console.log(blogPosts)

  return (
    <div className={styles.bloglist}>
      {blogPosts.blogPosts.map(blogPost => (
      <BlogCard key={blogPost.sys.id} blogPost={blogPost}/>
    ))}
      
    </div>
  )
}

