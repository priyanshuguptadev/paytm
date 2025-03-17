import {Link} from 'react-router-dom'
export const LinkPage = ({label, linkText, to}) => {
  return (
    <div className='px-4 py-3'>
      <p className='text-sm text-slate-600'>{label}<Link to={to} className='text-black text-sm underline ml-1'>{linkText}</Link></p>
    </div>
  )
}