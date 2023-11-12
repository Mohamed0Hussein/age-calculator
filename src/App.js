import { useState } from 'react';
import {DateInput} from './components'
import {ReactComponent as ArrowImage} from './assets/images/icon-arrow.svg'
function App() {
  const [day,setDay] = useState({isError:false,errorLabel:'',value:'--',current:''})
  const [month,setMonth] = useState({isError:false,errorLabel:'',value:'--',current:''})
  const [year,setYear] = useState({isError:false,errorLabel:'',value:'--',current:''})

  function calculateAge(){
    setDay({...day,errorLabel:'',isError:false})
    setMonth({...month,errorLabel:'',isError:false})
    setYear({...year,errorLabel:'',isError:false})
    const dayValue = day.current
    const monthValue = month.current
    const yearValue = year.current
    if(dayValue === '' || monthValue === '' || yearValue === ''){   
        if(dayValue === ''){
          setDay({...day,isError:true,errorLabel:'this field is required'})
        }
        if(monthValue === ''){
          setMonth({...month,isError:true,errorLabel:'this field is required'})
        }
        if(yearValue === ''){
          setYear({...year,isError:true,errorLabel:'this field is required'})  
        }
      }
      else if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31 || parseInt(monthValue) < 1 || parseInt(monthValue) > 12 || parseInt(yearValue) > new Date().getFullYear()) {
        if(parseInt(dayValue) < 1 || parseInt(dayValue) > 31){
          setDay({...day,isError:true,errorLabel:'Must be a valid day'})
        }
        if(parseInt(monthValue) < 1 || parseInt(monthValue) > 12){
          setMonth({...month,isError:true,errorLabel:'Must be a valid month'})
        }
        if(parseInt(yearValue) > new Date().getFullYear()){
          setYear({...year,isError:true,errorLabel:'Must be in the past'})
        } 
      }
      else if((parseInt(monthValue) === 4 || parseInt(monthValue) === 6 || parseInt(monthValue) === 9 || parseInt(monthValue) === 11 ) && parseInt(dayValue) === 31){
        setDay({...day,isError:true,errorLabel:'Must be a valid day'})
      }
      else if(parseInt(monthValue) === 2 && parseInt(yearValue) % 4 !== 0 && parseInt(dayValue) > 28){
        setDay({...day,isError:true,errorLabel:'Must be a valid day'})
      }
      else if (parseInt(monthValue) === 2 && parseInt(yearValue) % 4 === 0 && parseInt(dayValue) > 29){
        setDay({...day,isError:true,errorLabel:'Must be a valid day'})
      }
      else{
        var realYear = (new Date().getFullYear()) - parseInt(yearValue)
        var realMonth =  (new Date().getMonth() + 1 ) - parseInt(monthValue)
        var realDay = (new Date().getDate()) - parseInt(dayValue)
        if(realDay < 0){
          if(realMonth <= 0){
            realMonth = 12 - realMonth -1
            realYear-=1
          }
          switch(new Date().getMonth()){
            case 2:
              realDay+=31
              break
            case 3:
              if(new Date().getFullYear() % 4 === 0){
                realDay+=29
              }
              else{
                realDay+=28
              }
              break
            case 4:
              realDay+=31
              break
            case 5:
              realDay+=30
              break
            case 6:
              realDay+=31
              break
            case 7:
              realDay+=30
              break
            case 8:
              realDay+=31
              break
            case 9:
              realDay+=31
              break
            case 10:
              realDay+=30
              break
            case 11:
              realDay+=31
              break
            case 12:
              realDay+=30
              break
          }
        }
        setDay({...day,isError:false,errorLabel:'',value:realDay})
        setMonth({...month,isError:false,errorLabel:'',value:realMonth})
        setYear({...year,isError:false,errorLabel:'',value:realYear})
      }
    }

  return (
    <div className="h-screen flex items-center justify-around bg-slate-300">
      <div className="m-56 bg-white p-10  rounded-3xl rounded-br-[25%] w-content flex flex-col">
        <div className="flex flex-row pr-32 py-5 pl-10">
          <DateInput label={"DAY"}  error={day.isError} errorLabel={day.errorLabel} onChange={ (e) =>setDay({...day,current:e.currentTarget.value})}/>
          <DateInput label={"MONTH"}  error={month.isError} errorLabel={month.errorLabel} onChange={ (e) =>setMonth({...month,current:e.currentTarget.value})} />
          <DateInput label={"YEAR"} error={year.isError} errorLabel={year.errorLabel} onChange={ (e) =>setYear({...year,current:e.currentTarget.value})} />
        </div>
        <div className='h-1 w-full bg-[#ECECEC]'>
        </div>
          <div className='flex flex-row-reverse'>
            <ArrowImage className='bg-black rounded-full -mt-6 hover:bg-[#864CFF] hover:cursor-pointer' onClick={calculateAge}/>
          </div>
      <div>
        <p className=' font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{year.value}</span> years</p>
        <p className=' font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{month.value}</span> months</p>
        <p className=' font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{day.value}</span> days</p>
      </div>
      </div>
    </div>
  );
}

export default App;
