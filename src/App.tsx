import { useState } from "react";
import DatePickerComp from "./components/DatePickerComp"

function App() {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDates = (startDate: Date | null | string, endDate: Date | null | string) => {
    console.group('Selected Dates')
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)
    setStartDate(startDate as Date)
    setEndDate(endDate as Date)
    console.groupEnd()
  }

  const clearFn = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const initialDate = new Date('2022-01-01')

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <p>Debug: Selected Date : {startDate?.toString()} - {endDate?.toString()}</p>
      <div className='w-96'>
        <DatePickerComp onDatesChange={handleDates} onClear={clearFn} initDate={initialDate} />
      </div>
    </div>
  )
}
export default App;