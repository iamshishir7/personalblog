import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

import FormattedDate from './ui/Date';
import { ChevronRight } from 'lucide-react';


export default function Pagecard({blogPost}) {

    const { title, slug, thumbnail, description, date} = blogPost.fields

    return (
        <div>
        <Link legacyBehavior href={`/blogpost/${slug}`}>
        <div 
            className={styles.card}
        >
            <div className={styles.featured}>
            <Image 
                    src={'https:' + thumbnail.fields.file.url}
                    width={thumbnail.fields.file.details.image.width}
                    height={thumbnail.fields.file.details.image.height}
                    className='image'
                    alt='Image'
                    
                />
            </div>
            <div className={styles.content}>
                <div className ={styles.info}>
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                
                <div
                className={styles.actions}>
                    <Link href={`/blogpost/${slug}`}>
                        <div className={styles.readmore}>
                            Read More
                            <ChevronRight />
                        </div>
                    </Link>
                    <FormattedDate date={date}/>
                </div>
            </div>
            
        </div>
        
        </Link>
        </div>
    )
}

