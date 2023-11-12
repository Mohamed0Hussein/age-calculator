import React from 'react'

const DateInput = ({label, error, errorLabel ,...otherAttrib}) => {
  return (
    <div className='m-2 flex flex-col'>
        <p className={`font-Poppins_Bold text-sm mb-2 ${error ? 'text-[#E97077]' :'text-[#727272]'} `}>{label}</p>
        <input className={`w-32 h-16 border pl-5 rounded-md font-Poppins_Bold text-3xl hover:border-[#864CFF] focus:outline-[#864CFF] ${error? ` border-[#E97077] focus:outline-[#E97077]` : ``}`} type="number" placeholder={label === 'DAY'? 'DD' : label === 'MONTH' ? 'MM' : 'YYYY'}  {...otherAttrib}/>
        {error ? <p className='text-[#E97077]'>{errorLabel}</p> : <></>}
    </div>
  )
}

export default DateInput