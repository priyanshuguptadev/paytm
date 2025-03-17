export const Button = ({label, onClick}) => {
  return (
    <button type="button" className="text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full my-2 hover:cursor-pointer" onClick={onClick}>{label}</button>
  )
}