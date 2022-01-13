import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function BlogCard({blogPost}) {

    const { title, slug, thumbnail, featuredImage, content, tags} = blogPost.fields
    return (
        <div className={styles.card}>
            <div className={styles.featured}>
            <Image 
                    src={'https:' + thumbnail.fields.file.url}
                    width={thumbnail.fields.file.details.image.width}
                    height={thumbnail.fields.file.details.image.height}
                />
            </div>
            <div className={styles.content}>
                <div className ={styles.info}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.actions}>
                    <Link href={'/blogposts/'+ slug}><a>Read More</a></Link>
                </div>
            </div>
        </div>
    )
}

