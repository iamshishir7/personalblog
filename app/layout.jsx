import Link from 'next/link'
import Image from 'next/image'

import '../styles/globals.scss'

export const metadata = {
    title: 'Blog | Shishir Timalsina',
    description: 'Shishir Timalsina',
}
  

export default function Layout({children}) {
    const getYear = new Date().getFullYear()
    return (
        <html>
            <body>
                <div className='layout' >
                    <header>
                        <Link  href='/'>
                            <Image  src={'/logo.png'} width={200} height={86} alt='Logo'/>
                        </Link>
                    </header>
                    <div className='page-content'>
                        {children}
                    </div>
                    
                </div>
                <footer>
                    <div className='foot'>
                            <p>Blog developed & maintained by <span>Shishir Timalsina</span></p>
                            <p><span>&copy; Copyright {getYear}</span></p>
                    </div>
                </footer>
            </body>
        </html>
    )
}