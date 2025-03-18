export const Button = ({label, onClick}) => {
  return (
    <button class="btn btn-primary" onClick={onClick}>{label}</button>
  )
}