import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'


export default function Layout({children}) {
    return (
        <div className='layout' >
            <Head>
                <title>Blog | Shishir Timalsina</title>
            </Head>
            <header>
                <Link href='/'>
                    <a>
                    <Image src={'/logo.png'} width={200} height={86} />
                    </a>
                </Link>
            </header>

           
            <div className='page-content'
            
            >
                
                {children}
            </div>
           

            <footer >
                <div className='foot'>
                    <p>Blog Developed & Maintained by <span>Shishir Timalsina</span></p>
                    <p><span> 	&copy; Copyright 2022</span></p>
                </div>
            </footer>
        </div>
    )
}