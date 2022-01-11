
//import styles from '../styles/Home.module.css'

import {createClient} from 'contentful'

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
    <div className='recipe-list'>
      {blogPosts.blogPosts.map(blogPost => (
      <div key={blogPost.sys.id}>{blogPost.fields.title}</div>
    ))}
      
    </div>
  )
}

