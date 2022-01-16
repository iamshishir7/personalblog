
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
export default function Pagecard({blogPost}) {

    const { title, slug, thumbnail, featuredImage, content, tags, description} = blogPost.fields
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
                    <p>{description}</p>
                </div>
                <div className={styles.actions}>
                    <Link href={'/blogposts/'+ slug}><a>Read More</a></Link>
                </div>
            </div>
        </div>
    )
}

