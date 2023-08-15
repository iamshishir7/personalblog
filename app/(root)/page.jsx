
import { contentful } from '/libs/contentful'


import styles from '/app/styles/Home.module.scss'
import Pagecard from '/components/Pagecard'

export const revalidate = 0;

const HomePage = async() => {

    const res = await contentful.getEntries({ content_type: 'blogPost'})

    const blogPosts =  res.items

    return(
    <>
        <div className={styles.bloglist}>
            {blogPosts.map(blogPost => (
            <Pagecard key={blogPost.sys.id} blogPost={blogPost}/>
            ))}
        </div>
    </>
    )
}

export default HomePage