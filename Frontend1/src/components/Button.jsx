
function Button({className='',onClick,px,children,disabled=false,type="button"}) {

  const classes = ` button relative flex justify-center items-center transition-colors ${px || 'px-1'} ${disabled && `bg-gray-700`} ${className}`
    return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type}>
        <span>{children}</span>
    </button>
    )

}

export default Button

