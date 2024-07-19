import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./datepicker.css";
import moment from "moment";
import DateWrapper from "./rangePicker/DateWrapper";
import CalRangeIcon from "../lib/icons/cal_range";
import CalPointIcon from "../lib/icons/cal_point";
import { type Placement } from "@floating-ui/react";

interface DatePickerCompProps {
    format?: string; // default is "dd.MM.YYYY HH:SS"
    timeFormat?: string; // default is "HH:mm"
    formatReturn?: string; // default is "YYYY-MM-DD HH:SS"
    maxDate?: Date;
    minDate?: Date;
    maxTime?: Date;
    minTime?: Date;
    initDate?: Date | null;
    finalDate?: Date | null;
    disabled?: boolean;
    popperPlacement?: Placement;
    datePickerType?: "range" | "point";
    onDatesChange: (startDate: Date | null | string, endDate: Date | null | string) => void;
    onClear?: () => void;

}

const DatePickerComp = ({
    format = "dd.MM.YYYY HH:mm",
    timeFormat = "HH:mm",
    formatReturn,
    maxDate,
    minDate,
    maxTime,
    minTime,
    initDate,
    finalDate,
    disabled,
    popperPlacement,
    datePickerType,
    onDatesChange,
    onClear,
}: DatePickerCompProps) => {

    const icons = [
        { id: "range", icon: <CalRangeIcon />, text: "Date Range", placeholder: `${format} -> ${format}` },
        { id: "point", icon: <CalPointIcon />, text: "Date Point", placeholder: `${format}` },
    ];
    const [selectedIcon, setSelectedIcon] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        if (initDate) {
            setStartDate(initDate);
        }
    }, [initDate]);

    useEffect(() => {
        if (finalDate) {
            setEndDate(finalDate);
        }
    }, [finalDate]);

    useEffect(() => {
        if (datePickerType === "point") {
            setSelectedIcon("point")
            setEndDate(null)
        } else if (datePickerType === "range") {
            setSelectedIcon("range")
        } else {
            setSelectedIcon("range")
        }
    })

    useEffect(() => {
        let formatted;
        const formatTime = format.split(':');
        const formatUppercase = `${formatTime[0].toUpperCase()}:${formatTime[1]}`;

        if (formatReturn) {
            formatted = formatReturn;
        } else {
            formatted = formatUppercase;
        }

        if (onDatesChange) {
            const isDateValid = (date: Date | null) => moment(date).isValid();
            if (selectedIcon === "point" && isDateValid(startDate)) {
                onDatesChange(moment(startDate).format(formatted), null);

            } else if (selectedIcon === "range" && isDateValid(startDate) && isDateValid(endDate)) {
                onDatesChange(
                    moment(startDate).format(formatted),
                    moment(endDate).format(formatted)
                );
            }
        }
    }, [startDate, endDate, onDatesChange]);


    const onChangeSingle = (date: Date | null) => {
        setStartDate(date);
        setEndDate(null);
    };
    return (
        <>
            <label className="text-xs text-muted-900 -tracking-[0.3px] z-40 ">
                {selectedIcon === "range" ? "Datum (Start -> Eind)" : "Datum"}
            </label>

            <DateWrapper
                selectedIcon={selectedIcon}
                datePickerType={datePickerType}
                setSelectedIcon={setSelectedIcon}
                icons={icons}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
                onClear={onClear}
            >

                {selectedIcon === "range" ?
                    <>
                        <DatePicker
                            dateFormat={format}
                            timeFormat={timeFormat}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            startDate={startDate as Date}
                            endDate={endDate as Date}
                            showTimeSelect
                            placeholderText={format.toLocaleUpperCase()}
                            showMonthDropdown
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
                            timeFormat={timeFormat}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            startDate={startDate as Date}
                            endDate={endDate as Date}
                            {...(disabled && { disabled })}
                            showTimeSelect
                            maxDate={maxDate}
                            minDate={minDate ? minDate : startDate as Date}
                            maxTime={maxTime}
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
                        timeFormat={timeFormat}
                        selected={startDate}
                        onChange={onChangeSingle}
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
