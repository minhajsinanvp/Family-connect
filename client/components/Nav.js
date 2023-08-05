import Link from 'next/link'

const Nav = () => {
    return (

        <nav className=" bg-black navbar navbar-expand-md nav d-flex justify-content-between">

            <div className="collapse navbar-collapse " id="navbarNav">
                
                        <Link href="/" className='nav-link text-light '>Connect You</Link>


                  
                        <Link className='nav-link text-light' href="/login">Login</Link>
                   
                
                        <Link href="/register" className='nav-link text-light' >Register</Link>
                 

                
            </div>
        </nav>


    )
}


export default Nav;