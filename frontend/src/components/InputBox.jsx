export const InputBox = ({ label, placeholder, isPassword, onChange, isOptional }) => {
  return (
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{label}</legend>
      <input type={isPassword? 'password' : 'text'} class="input" placeholder={placeholder} onChange={onChange} className="input w-full"/>
      {isOptional? <p class="fieldset-label">Optional</p>: ''}
    </fieldset>
  );
};
