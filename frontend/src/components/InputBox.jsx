export const InputBox = ({label, placeholder, isPassword, onChange}) => {
  return (
    <div className='py-2'>
      <label className='block text-left text-sm mb-1'>{label}</label>
      <input type={isPassword? 'password' : 'text'} placeholder={placeholder} className='w-full p-3 outline-green-300 outline-2 rounded-md placeholder:text-sm text-sm' onChange={onChange}/>
    </div>
  )
}