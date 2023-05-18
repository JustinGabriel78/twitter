import axios from "axios";
import { useEffect, useState } from "react";
import SearchResult from "./searchResult";

const Search = () => {
    const [mainData, setMainData] = useState([]);
    const [value, Setvalue] = useState("");
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/user/getUser',
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if (response.data) {
                setMainData(response.data.data)
            }
        } 
        fetchData()  
    },[])

    useEffect(() => {
        const data = value&&mainData.filter(data => data.username.toLocaleLowerCase().includes(value))
        setFilteredData(data)
    },[value])
    


    return(
        <div className="fixed ml-[880px]">
            <div className="mx-5">
                <input type="search" className="rounded-full mt-2 w-80 h-10 pl-9 bg-slate-200 outline-none" placeholder="Search" value={value} onChange ={(e) => Setvalue(e.target.value.toLocaleLowerCase())}/>
            </div>
            {value&&<p className="mx-5 pt-3 pl-4 h-12 ">Search for "{value}"</p>}
            {filteredData&&filteredData.map(data => <SearchResult data={data} />)}
        </div>
    )
}

export default Search