import Link from 'next/link';
import { userContext } from '../context';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const Nav = () => {

    const [state, setState] = useContext(userContext);
    const router = useRouter();

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }

    return (
        <nav className="w-100 h-100 bg-black navbar navbar-expand-md nav d-flex justify-content-between">
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <div>
                    <Link href="/" className='nav-link text-light '>Connect You</Link>
                </div>
                <div>
                    {state && (
                        <>
                        <Link href="/dashboard" className='text-decoration-none text-light'>{state.user.name}</Link>
                        <a onClick={logout} href="/login" className=' mx-4 text-decoration-none text-light' >Logout</a>
                         </>
                    )}
                    {!state && (
                        <>
                            <Link className='text-decoration-none text-light' href="/login">Login</Link>
                            <Link href="/register" className=' mx-4 text-decoration-none text-light'>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
