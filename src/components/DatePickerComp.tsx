import  { useEffect, useState } from "react";
import DatePicker  from "react-datepicker";
import "./datepicker.css";
import moment from "moment";
import DateWrapper from "./rangePicker/DateWrapper";
import CalRangeIcon from "../lib/icons/cal_range";
import CalPointIcon from "../lib/icons/cal_point";
import { type Placement } from "@floating-ui/react";

interface DatePickerCompProps {
    format?: string;
    showTimeSelectOnly?: boolean;
    maxDate?: Date;
    minDate?: Date;
    maxTime?: Date;
    minTime?: Date;
    disabled?: boolean;
    popperPlacement?: Placement;
    onDatesChange: (startDate: Date | null | string, endDate: Date | null | string) => void;

}

const DatePickerComp = ({
    format = "dd.MM.YYYY HH:SS",
    showTimeSelectOnly = false,
    maxDate,
    minDate,
    maxTime,
    minTime,
    disabled,
    popperPlacement,
    onDatesChange
}:DatePickerCompProps) => {

    const icons = [
        { id: "range", icon: <CalRangeIcon />, text: "Date Range", placeholder: `${format} -> ${format}` },
        { id: "point", icon: <CalPointIcon />, text: "Date Point", placeholder: `${format}` },
    ];
    const [selectedIcon, setSelectedIcon] = useState<string>("range");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
      if (onDatesChange) {
        const isDateValid = (date: Date | null) => moment(date).isValid();
        if (selectedIcon === "point" && isDateValid(startDate)) {
            onDatesChange(moment(startDate).format(format.toLocaleUpperCase()), null);
        } else if (selectedIcon === "range" && isDateValid(startDate) && isDateValid(endDate)){
            onDatesChange(
              moment(startDate).format(format.toLocaleUpperCase()), 
              moment(endDate).format(format.toLocaleUpperCase())  
            );
        }
      }
  }, [startDate, endDate, onDatesChange]);


    const onChangeSingle = (date: Date | null) => {
        setStartDate(date);
        setEndDate(null);
    };

    const dateOne = moment(startDate).isValid() ? moment(startDate).format(format) : null;
    const dateTwo = moment(endDate).isValid() ? moment(endDate).format(format) : null;
    return (
        <>
          

            <DateWrapper
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                icons={icons}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
            >
                   <p className="z-40">Selected Date(s): {dateOne} {dateTwo}</p>
            <label className="text-xs text-muted-900 -tracking-[0.3px] z-40 ">
                {selectedIcon === "range" ? "Datum (Start -> Eind)" : "Datum"}
            </label>

                {selectedIcon === "range" ?
                    <>
                        <DatePicker
                            dateFormat={format}
                            timeFormat="HH:mm"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            startDate={startDate as Date}
                            endDate={endDate as Date}
                            showTimeSelect
                            placeholderText={format.toLocaleUpperCase()}
                            showMonthDropdown
                            {...(showTimeSelectOnly && { showTimeSelectOnly })}
                            {...(disabled && { disabled })}
                            maxDate={maxDate}
                            minDate={minDate}
                            maxTime={maxTime}
                            minTime={minTime}

                            className="z-50 pl-2 bg-transparent -mr-7 text-muted-900 font-tjilp"
                            selectsStart
                            popperPlacement={popperPlacement ? popperPlacement : "bottom-start"}
                            showYearDropdown
                            timeIntervals={30}
                            calendarStartDay={1}
                            showPopperArrow={false}
                            popperClassName="z-50"
                            wrapperClassName="z-50"

                        />
                        <span className={`flex px-2 whitespace-nowrap ${startDate !== null ? 'text-muted-900' : ''} `}>{'->'}</span>
                        <DatePicker
                            dateFormat={format}
                            placeholderText={format.toLocaleUpperCase()}
                            timeFormat="HH:mm"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            startDate={startDate as Date}
                            endDate={endDate as Date}
                            {...(showTimeSelectOnly && { showTimeSelectOnly })}
                            {...(disabled && { disabled })}
                            showTimeSelect
                            maxDate={maxDate}
                            minDate={minDate}
                            maxTime={maxTime}
                            minTime={minTime}
                            className="pl-2 bg-transparent text-muted-900 font-tjilp"
                            selectsEnd
                            showMonthDropdown
                            showYearDropdown
                            timeIntervals={30}
                            calendarStartDay={1}
                            popperClassName="z-50"
                            showPopperArrow={false}
                            popperPlacement={popperPlacement ? popperPlacement : "bottom-end"}
                        />
                    </>
                    :
                    <DatePicker
                        dateFormat={format}
                        placeholderText={format.toLocaleUpperCase()}
                        timeFormat="HH:mm"
                        selected={startDate}
                        onChange={onChangeSingle}
                        {...(showTimeSelectOnly && { showTimeSelectOnly })}
                        {...(disabled && { disabled })}
                        maxDate={maxDate}
                        minDate={minDate}
                        maxTime={maxTime}
                        minTime={minTime}
                        showTimeSelect
                        timeIntervals={30}
                        showPopperArrow={false}
                        className="pl-2 bg-transparent text-muted-900"
                        showMonthDropdown
                        showYearDropdown
                        calendarStartDay={1}
                        popperClassName="z-50"
                        popperPlacement={popperPlacement ? popperPlacement : "bottom-start"}
                    />
                }

            </DateWrapper>
         
        </>
    );
};

export default DatePickerComp;
