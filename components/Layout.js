import Link from 'next/link'

export default function Layout({children}) {
    return (
        <div className='layout'>
            <header>
                <Link href='/'>
                    <a>
                        <h1>
                            Ideas by Shishir
                        </h1>
                    </a>
                </Link>
            </header>

            <div className='page-content'>
                {children}
            </div>

            <footer>
                <p>Copyright Shishir 2022</p>
            </footer>
        </div>
    )
}