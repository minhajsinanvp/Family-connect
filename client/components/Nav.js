import Link from 'next/link';
import { userContext } from '../context';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar } from 'antd';


const Nav = () => {
    const [path, setPath] = useState("");
    const [state, setState] = useContext(userContext);
    const router = useRouter();

    useEffect(() => {
        process.browser && setPath(window.location.pathname);
    }, [process.browser && window.location.pathname]);

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
                        <div className='d-flex mx-2'>
                        
                            
                        
                        <div className="dropdown mt-2">
                            <button className="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {state.user && state.user.userName ? state.user.userName : state.user.name}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link href="/user/dashboard" className={`dropdown-item ${path === '/user/dashboard' ? 'active' : 'text-dark'}`}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/user/profile/update" className={`dropdown-item ${path === '/user/profile/update' ? 'active' : 'text-dark'}`}>
                                        profile update
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item text-dark" onClick={logout} href="#">
                                        Logout
                                    </a>
                                </li>
                            </ul>

                            
                        </div>
                        <Avatar size={60} src={state.user.image} className="d-flex justify-content-center mx-3"/>
                        </div>

              

                       
                        
                    )}
                    {!state && (
                        <>
                            <Link className={`text-decoration-none ${path === '/login' ? 'active' : 'text-light'}`} href="/login">Login</Link>
                            <Link href="/register" className={`mx-4 text-decoration-none ${path === '/register' ? 'active' : 'text-light'}`}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
