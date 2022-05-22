
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import {  motion } from "framer-motion"


export default function Pagecard({blogPost}) {

    const { title, slug, thumbnail, featuredImage, content, tags, description} = blogPost.fields

    const slashMotion = {
        rest: { opacity: 1, x:-155, ease: "easeOut", type: "tween" },
        hover: {
            x:0,
          transition: {
            duration: 0.15,
            type: "tween",
            ease: "easeIn"
          }
        }
      };
    
    return (
        <motion.div 
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:50}}
        transition={{ease:"easeIn", delay:0.05}}
        >
        <motion.div initial="rest" whileHover="hover" animate="rest" className={styles.card}
        >
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
                
                <motion.div
                variants={slashMotion}
                className={styles.actions}>
                    <Link href={'/blogposts/'+ slug}>Read More </Link>
                </motion.div>
                
                
            </div>
        </motion.div>
        </motion.div>
    )
}

