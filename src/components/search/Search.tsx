import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"

const Search = () => {
    const [result, setResult] = useState([]);
    return (
        <div className="flex justify-center items-center flex-col pt-24 min-w-[400px] w-full">
            <SearchBar setResult={setResult} />
            <SearchResult result={result} />
        </div>
    )
}

export default Search