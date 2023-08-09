import Link from 'next/link';
import { userContext } from '../context';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Nav = () => {

    const [path, setPath] = useState("")
    const [state, setState] = useContext(userContext);
    const router = useRouter();


    useEffect(() => {
        
        process.browser && setPath(window.location.pathname);
        
    },[process.browser && window.location.pathname])

   

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }

    return (
        <nav className="w-100 h-100 bg-black navbar navbar-expand-md nav d-flex justify-content-between">
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <div>
                    <Link href="/" className={`nav-link ${path === '/' ? 'active' : 'text-light'}`}>Connect You</Link>
                </div>
                <div>
                    {state && (
                        <>
                            <Link  href="/user/dashboard" className={`text-decoration-none ${path === '/user/dashboard' ? 'active' : 'text-light'}` }>{state.user.name}</Link>
                            <a onClick={logout} href="/login" className=' mx-4 text-decoration-none text-light' >Logout</a>
                        </>
                    )}
                    {!state && (
                        <>
                            <Link className={`text-decoration-none  ${path === '/login' ? 'active' : 'text-light'}`} href="/login">Login</Link>
                            <Link href="/register" className={`mx-4 text-decoration-none  ${path === '/register' ? 'active' : 'text-light'} `}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
