import { useState } from "react";
import { FaSearch } from "react-icons/fa";
interface IUser {
  id: number;
  name: string;
  email: string;
}
interface SearchBarProps {
  setResult: (users: IUser[]) => void;
}
const SearchBar = ({ setResult }: SearchBarProps) => {

  const [input, setInput] = useState("");
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  const userData = async (value: string): Promise<IUser[]> => {
    try {
      const response = await fetch(API_URL);
      const data: IUser[] = await response.json();

      const result = data.filter(user => {
        return user && user.name && user.name.toLowerCase().includes(value);
      });

      setResult(result)
      console.log(result)
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleChange = (value: string) => {
    setInput(value)
    userData(value)
  }
  return (
    <div className="bg-[#2f3143] w-full rounded-lg h-[12] p-4 shadow-lg flex items-center">
      <FaSearch className="text-violet-500 cursor-pointer" />
      <input type="text" placeholder="Search for something"
        className="bg-transparent border-none outline-none text-xl ml-1 placeholder:text-gray-300 text-white w-full"
        onChange={(e) => handleChange(e.target.value)} />
    </div>
  )
}

export default SearchBar