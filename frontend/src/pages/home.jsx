// import Navbar from "../components/navbar"
import LeftSidebar from "../components/leftSidebar"
import Feed from "../components/feed"
import Search from "../components/search"
const Home = () => {
    return(
        <div className=" flex row mx-72">
            <LeftSidebar />
            <Feed />
            <Search />
    
        </div>
    )
}  

export default Home