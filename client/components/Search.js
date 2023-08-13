import { useContext, useState } from "react"
import { userContext } from "../context"
import axios from "axios"
import SideBar from "./SideBar"
import { toast } from "react-toastify"



function Search() {

    const [state, setState] = useContext(userContext)
    const [findUser, setFindUser] = useState("")
    // const [people, setPeople] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const searchUser = async (e) => {
        e.preventDefault()
        // console.log(findUser);
        try {

            const { data } = await axios.get(`/find-user/${findUser}`)
            setSearchResult(data)
            // console.log(searchResult);
            setFindUser("")

        } catch (error) {
            console.log(error);
        }
    }

    const handleFollow = async (user) => {
        console.log("follow is clicked");
        try {


            const { data } = await axios.put("/follow-request", { _id: user._id })

            let auth = JSON.parse(localStorage.getItem('auth'));

            auth.user = data;

            localStorage.setItem('auth', JSON.stringify(auth))

            setState({ ...state, user: data })
            toast.success(`Following ${user.name}`)

            let filtered = searchResult .filter((person) => (person._id !== user._id))
            console.log(filtered);
            setSearchResult(filtered)

           
        } catch (error) {
            console.log(error);

        }
    }

    const handleUnFollow = async (user) => {

        try {
            const { data } = await axios.put("/user-unfollow", { _id: user._id })

            let auth = JSON.parse(localStorage.getItem('auth'));

            auth.user = data;

            localStorage.setItem('auth', JSON.stringify(auth))

            setState({ ...state, user: data })
            toast.error(`Unfollowing ${user.name}`)

            let filtered = searchResult.filter((person) => (person._id !== user._id))
            console.log(filtered);
            setSearchResult(filtered)

            
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <form className="form-inline mt-2 col-12 d-flex mb-4" onSubmit={searchUser}>
                <input type="search" placeholder="Search" onChange={(e) => {
                    setFindUser(e.target.value)
                    setSearchResult([])

                }} value={findUser} className="form-control mr-sm-2 col" />
                <button type="submit" className="mx-2 col-3 btn btn-outline-primary">search</button>
            </form>

            {searchResult.length > 0 && <SideBar peopleData={searchResult} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />}
        </>

    )
}

export default Search