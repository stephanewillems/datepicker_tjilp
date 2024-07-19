import DatePickerComp from "./components/DatePickerComp"

function App() {

  const handleDates = (startDate: Date | null | string, endDate: Date | null | string) => {
    console.group('Selected Dates')
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)
    console.groupEnd()
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <div className='w-96'>
        <DatePickerComp onDatesChange={handleDates} datePickerType="range" />
      </div>
    </div>
  )
}
export default App;