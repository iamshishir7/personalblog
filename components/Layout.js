import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'



export default function Layout({children}) {
    const getYear = () => {
        return new Date().getFullYear()
    }
    return (
        <div className='layout' >
            <Head>
                <title>Blog | Shishir Timalsina</title>
            </Head>
            <header>
                <Link  href='/'>
                    
                    <Image  src={'/logo.png'} width={200} height={86} />
                    
                </Link>
                
            </header>
            <div className='page-content'>
                {children}
            </div>
           <footer >
                <div className='foot'>
                    <p>Blog developed & maintained by <span>Shishir Timalsina</span></p>
                    <p><span>&copy; Copyright {getYear()}</span></p>
                </div>
            </footer>
        </div>
    )
}