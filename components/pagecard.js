
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import {  motion } from "framer-motion"


export default function Pagecard({blogPost}) {

    const { title, slug, thumbnail, description, date} = blogPost.fields

    const slashMotion = {
        rest: { opacity: 1, x:-115, ease: "easeOut", type: "tween" },
        hover: {
            x:0,
          transition: {
            duration: 0.15,
            type: "tween",
            ease: "easeIn"
          }
        }
      };
      
    const dateparts = date.split('-');
    const convertdate = new Date(dateparts[0], dateparts[1] - 1, dateparts[2]).toDateString();
    const day = convertdate.slice(0, 3);
    const dateonly = convertdate.slice(4,10) + ", " + convertdate.slice(11,15);
    

    
    return (
        <motion.div 
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:50}}
        transition={{ease:"easeIn", delay:0.05}}
        >
        <Link href={'/blogposts/'+ slug}>
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
                    <div className={styles.date}><span>{day}</span> - {dateonly}</div>
                </motion.div>
                
                
            </div>
            
        </motion.div>
        </Link>
        </motion.div>
    )
}

