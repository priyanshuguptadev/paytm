export const Button = ({label, onClick, loading}) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>{loading ? <span className="loading loading-dots loading-lg"></span> : label}</button>
  )
}