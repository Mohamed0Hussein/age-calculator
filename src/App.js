import { useState } from 'react';
import { DateInput } from './components';
import { ReactComponent as ArrowImage } from './assets/images/icon-arrow.svg';

function App() {
  const [day, setDay] = useState({ isError: false, errorLabel: '', value: '--', current: '' });
  const [month, setMonth] = useState({ isError: false, errorLabel: '', value: '--', current: '' });
  const [year, setYear] = useState({ isError: false, errorLabel: '', value: '--', current: '' });


  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };


  const countLeapYears = (birthDate, currentDate) => {
    let count = 0;
    const birthYear = birthDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    
  
    const bornAfterFeb29 = isLeapYear(birthYear) && 
                         (birthDate.getMonth() > 1 || 
                         (birthDate.getMonth() === 1 && birthDate.getDate() > 29));

  
    const currentBeforeFeb29 = isLeapYear(currentYear) &&
                             (currentDate.getMonth() < 1 ||
                             (currentDate.getMonth() === 1 && currentDate.getDate() < 29));

  
    const startYear = bornAfterFeb29 ? birthYear + 1 : birthYear;
    const endYear = currentBeforeFeb29 ? currentYear - 1 : currentYear;

    for (let year = startYear; year <= endYear; year++) {
      if (isLeapYear(year)) count++;
    }
    return count;
  };


  const getDaysInMonth = (year, month) => {
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  };

  const calculateAge = () => {
  
    setDay({ ...day, isError: false, errorLabel: '' });
    setMonth({ ...month, isError: false, errorLabel: '' });
    setYear({ ...year, isError: false, errorLabel: '' });

    const dayValue = day.current;
    const monthValue = month.current;
    const yearValue = year.current;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

  
    if (dayValue === '' || monthValue === '' || yearValue === '') {
      if (dayValue === '') {
        setDay({ ...day, isError: true, errorLabel: 'this field is required' });
      }
      if (monthValue === '') {
        setMonth({ ...month, isError: true, errorLabel: 'this field is required' });
      }
      if (yearValue === '') {
        setYear({ ...year, isError: true, errorLabel: 'this field is required' });
      }
      return;
    }

    const dayNum = parseInt(dayValue);
    const monthNum = parseInt(monthValue);
    const yearNum = parseInt(yearValue);
  
    if (yearNum > currentYear) {
      setYear({ ...year, isError: true, errorLabel: 'Must be in the past' });
      return;
    }
  
    if (monthNum < 1 || monthNum > 12) {
      setMonth({ ...month, isError: true, errorLabel: 'Must be a valid month' });
      return;
    }
  
    const maxDays = getDaysInMonth(yearNum, monthNum);
    if (dayNum < 1 || dayNum > maxDays) {
      setDay({ ...day, isError: true, errorLabel: 'Must be a valid day' });
      return;
    }
  
    if (yearNum === currentYear && 
        (monthNum > currentMonth || 
         (monthNum === currentMonth && dayNum > currentDay))) {
      if (monthNum > currentMonth) {
        setMonth({ ...month, isError: true, errorLabel: 'Must be in the past' });
      }
      if (monthNum === currentMonth && dayNum > currentDay) {
        setDay({ ...day, isError: true, errorLabel: 'Must be in the past' });
      }
      return;
    }
  
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    const leapYearsCount = countLeapYears(birthDate, currentDate);

    if (days < 0) {
      months--;
    
      const prevMonthLastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

  
    days += leapYearsCount;

  
    const currentDaysInMonth = getDaysInMonth(currentYear, currentMonth);
    if (days >= currentDaysInMonth) {
      days -= currentDaysInMonth;
      months++;
      if (months >= 12) {
        months -= 12;
        years++;
      }
    }

    setDay({ ...day, isError: false, errorLabel: '', value: days });
    setMonth({ ...month, isError: false, errorLabel: '', value: months });
    setYear({ ...year, isError: false, errorLabel: '', value: years });
  };

  return (
    <div className="h-screen flex items-center justify-around bg-slate-300">
      <div className="m-56 bg-white p-10 rounded-3xl rounded-br-[25%] w-content flex flex-col">
        <div className="flex flex-row pr-32 py-5 pl-10">
          <DateInput 
            label={"DAY"}  
            error={day.isError} 
            errorLabel={day.errorLabel} 
            value={day.current}
            onChange={(e) => setDay({...day, current: e.target.value.replace(/\D/g, '').slice(0, 2)})}
          />
          <DateInput 
            label={"MONTH"}  
            error={month.isError} 
            errorLabel={month.errorLabel} 
            value={month.current}
            onChange={(e) => setMonth({...month, current: e.target.value.replace(/\D/g, '').slice(0, 2)})} 
          />
          <DateInput 
            label={"YEAR"} 
            error={year.isError} 
            errorLabel={year.errorLabel} 
            value={year.current}
            onChange={(e) => setYear({...year, current: e.target.value.replace(/\D/g, '').slice(0, 4)})} 
          />
        </div>
        <div className='h-1 w-full bg-[#ECECEC]'></div>
        <div className='flex flex-row-reverse'>
          <ArrowImage 
            className='bg-black rounded-full -mt-6 hover:bg-[#864CFF] hover:cursor-pointer' 
            onClick={calculateAge}
          />
        </div>
        <div>
          <p className='font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{year.value}</span> years</p>
          <p className='font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{month.value}</span> months</p>
          <p className='font-Poppins_ExtraBoldItalic text-8xl'><span className='text-[#864CFF]'>{day.value}</span> days</p>
        </div>
      </div>
    </div>
  );
}

export default App;