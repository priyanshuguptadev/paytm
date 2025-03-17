import { CiSearch } from "react-icons/ci";
export const Search = ({onChange}) => {
  return (
    <div className='w-full py-2 px-2 border-2 border-green-300 rounded-full md:px-8 flex'>
    <input type="text" className='w-full outline-0' placeholder='Search for your friends...' onChange={onChange}/>
    </div>
  )
}