
import Image from 'next/image'

import { contentful, convertToJSX } from '/libs/contentful';
import BlogAuthor from '/components/BlogAuthor'
import FormattedDate from '/components/ui/Date';
import styles from '/app/styles/Slug.module.scss'
import RecentPosts from '/components/RecentPosts';
import { Tag} from 'lucide-react';


export const revalidate = 0;

const BlogPostPage = async({params}) => {

    const res = await contentful.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug
    })

    const blogPost = res.items[0];

    const {featuredImage, title, content, tags, description, date} = blogPost.fields
    
    return (
        <>
        
          <div className={styles.blogheader}>
            <h2 className={styles.titlex}>{title}</h2>

            <BlogAuthor author={'Shishir Timalsina'} caption={'Software and Web developer'}/>

            <div className={styles.date}>
              <span>Published on </span>
              <FormattedDate date={date} />
            </div>
          
            <p>{description}</p>
          </div>
        
          <Image className={`image ${styles.bannerimage}`}
              src={'https:' + featuredImage.fields.file.url}
              width={featuredImage.fields.file.details.image.width}
              height={featuredImage.fields.file.details.image.height}
              alt='BlogPostImg'
          />
        
        
        <div className={styles.content}>
            <div>{convertToJSX(content)}</div>

            <div className={styles.tagcontainer}>
              <p>Tags</p>
              <div className={styles.taglist}>
                    {
                      tags.map((tag, index) => (
                        <div className={styles.tag} key={index}><Tag size={20}/>{tag}</div>
                      ))
                    }
              </div>
            </div>
        </div>
        <RecentPosts/>
      </>
    )
}

export default BlogPostPage