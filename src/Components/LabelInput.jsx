export const LabelInput = ({ id, labelClassName, text, email, name, placeholder, eventChange, value, children }) => {
  
  const type = text ? "text": email ? "email" : "";

  const handleChange = (e) => {
    eventChange(e)
  }
  
  return (
    <label className={labelClassName}>
      <input autoComplete="off" onChange={handleChange} value={value} id={id} type={type} name={name} placeholder={placeholder} required />
      { children }
    </label>
  )
}