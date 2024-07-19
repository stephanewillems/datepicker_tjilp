import React, { createRef, ReactNode, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from '../../lib/icons/chevron-down';
import { XmarkCircleFillIcon } from '../xmark-circle-fill';

interface DateWrapperProps {
    children: React.ReactNode;
    selectedIcon: string;
    setSelectedIcon: (icon: string) => void;
    icons: { id: string, icon: ReactNode, text: string }[];
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    startDate?: Date | null;
    onClear?: () => void;
    datePickerType?: "range" | "point";
}

const DateWrapper = ({ children, selectedIcon, setSelectedIcon, icons, setEndDate, setStartDate, startDate, onClear, datePickerType }: DateWrapperProps) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const refDropdown = createRef<HTMLDivElement>();
    const refButton = createRef<HTMLDivElement>();

    const handleDropdown = () => {
        if (datePickerType) return;
        setDropdown(!dropdown);
    };

    const handleIconSelect = (id: string) => {
        setSelectedIcon(id);
        setDropdown(false);
    };
    const selectedIconObject = icons.find((icon) => icon.id === selectedIcon);

    useOutsideClick({
        refs: [refDropdown, refButton],
        onOutsideClick: () => setDropdown(false),
    });

    const handleClear = () => {
        if (selectedIcon === "range") {
            setStartDate(null);
            setEndDate(null);
        } else {
            setStartDate!(null);
        }
        onClear && onClear();
    }


    return (
        <div className="relative flex flex-row items-center justify-start border border-muted-400 rounded-sm h-[32px] -mr-10 font-tjilp z-50">
            <div
                className="relative w-[32px] content-center h-full bg-muted-50 rounded-l-sm flex flex-row items-center justify-center border-r border-muted-400"
                onClick={handleDropdown}
                ref={refButton}
            >
                <div className={`relative ${datePickerType === undefined && 'cursor-pointer'}`}>
                    {selectedIconObject?.icon}
                    <AnimatePresence>
                        {datePickerType === undefined && <motion.div
                            key={"chevron"}
                            className="absolute top-[11px] left-[15px] w-[6px]"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: dropdown ? 180 : 0 }}
                            exit={{ rotate: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDownIcon className="w-full fill-shade-500" />
                        </motion.div>}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {dropdown && (
                        <motion.div
                            key={"dropdown"}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            ref={refDropdown}
                            className="absolute top-[32px] -left-[1px] bg-white border border-muted-400 rounded-sm shadow-md w-[31px] flex flex-col items-center justify-center space-y-1 overflow-hidden"
                        >
                            {icons.map((icon) => (
                                <div
                                    key={icon.id}
                                    title={icon.text}
                                    className="w-full pl-[7px] pt-[6px] pb-[6px] hover:bg-muted-100"
                                    onClick={() => handleIconSelect(icon.id)}
                                >
                                    {icon.icon}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="text-shade-300 text-base w-[100%] content-center flex flex-row items-center justify-start">
                {children}
            </div>
            {
                startDate !== null &&
                <div>
                    <button onClick={handleClear} className='absolute right-2 top-[7px]'><XmarkCircleFillIcon className='fill-shade-300 hover:fill-shade-400 transition-all duration-150' /></button>
                </div>
            }
        </div>
    )
}

export default DateWrapper;
