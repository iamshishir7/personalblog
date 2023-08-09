
import {AiOutlineTags} from 'react-icons/ai'
import Image from 'next/image'

import { contentful, convertToJSX } from '../../../../libs/contentful';
import BlogAuthor from '../../../../components/blogAuthor';
import FormattedDate from '../../../../components/ui/date';
import styles from '../../../../styles/Slug.module.scss'

export const revalidate = 0;

const BlogPostPage = async({params}) => {

    const res = await contentful.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug
    })

    const blogPost = res.items[0];

    const {featuredImage, title, content, tags, description, date} = blogPost.fields
    
    return (
        <div>
        
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
                        <div className={styles.tag} key={index}><AiOutlineTags/>{tag}</div>
                      ))
                    }
              </div>
            </div>
        </div>
        
      </div>
    )
}

export default BlogPostPage