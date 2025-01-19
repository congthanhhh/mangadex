import { IUser } from './SearchBar';

interface SearchResultProps {
    result: IUser[];
}

const SearchResult = ({ result }: SearchResultProps) => {
    return (
        <div className="w-full bg-[#2f3134] flex flex-col shadow-lg
        rounded-lg mt-4 max-h-[300px] overflow-y-scroll px-3 scrollbar">
            {result.map((item, index) => (
                <div key={index}>
                    <p className='text-white text-lg mt-1 cursor-pointer
                    hover:bg-gray-700 py-2'>{item.name}</p>
                </div>
            ))}
        </div>
    );
};


export default SearchResult