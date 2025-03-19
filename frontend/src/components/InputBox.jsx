export const InputBox = ({ label, placeholder, isPassword, onChange, isOptional }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input type={isPassword? 'password' : 'text'} className="input w-full" placeholder={placeholder} onChange={onChange}/>
      {isOptional? <p className="fieldset-label">Optional</p>: ''}
    </fieldset>
  );
};
