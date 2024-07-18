import { AnimatePresence, motion } from 'framer-motion';
import React, { createRef, forwardRef, useState } from 'react'
import CalRangeIcon from '../../lib/icons/cal_range';
import CalPointIcon from '../../lib/icons/cal_point';
import { ChevronDownIcon } from '../../lib/icons/chevron-down';
import useOutsideClick from '../../hooks/useOutsideClick';

interface CustomInputProps {
    value: string;
    onClick: () => void;
    selectedIcon: string;
    setSelectedIcon: (icon: string) => void;
    dropdown: boolean;
    setDropdown: (dropdown: boolean) => void;
}

const icons = [
    { id: "range", icon: <CalRangeIcon />, text: "Date Range", placeholder: "DD.MM.YYYY HH:SS -> DD.MM.YYYY HH:SS" },
    { id: "point", icon: <CalPointIcon />, text: "Date Point", placeholder: "DD.MM.YYYY HH:SS" },
];


const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick, dropdown, selectedIcon, setDropdown, setSelectedIcon }, ref) => {
        const refDropdown = createRef<HTMLDivElement>();




        const handleDropdown = () => {
            setDropdown(!dropdown);
        };

        const handleIconSelect = (id: string) => {
            setSelectedIcon(id);
            setDropdown(false);
        };
        const selectedIconObject = icons.find((icon) => icon.id === selectedIcon);
        console.log(value)


        useOutsideClick({
            refs: [refDropdown],
            onOutsideClick: () => setDropdown(false),
        })

        return (
            <div className="font-tjilp">
                <div className="flex flex-row items-center justify-start border border-muted-400 rounded-sm h-[32px] -mr-3">
                    <div
                        className="relative w-[32px] content-center h-full bg-muted-50 rounded-l-sm flex flex-row items-center justify-center border-r border-muted-400"
                        onClick={handleDropdown}
                    >
                        <div className="relative cursor-pointer">
                            {selectedIconObject?.icon}
                            <AnimatePresence>
                                <motion.div
                                    key={"chevron"}
                                    className="absolute top-[11px] left-[15px] w-[6px]"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: dropdown ? 180 : 0 }}
                                    exit={{ rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className="w-full fill-shade-500" />
                                </motion.div>
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
                                            className="w-full pl-[6px] pt-1 pb-1 hover:bg-muted-100"
                                            onClick={() => handleIconSelect(icon.id)}
                                        >
                                            {icon.icon}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div
                        className="pl-2 text-shade-300 text-base w-[100%] content-center cursor-pointer"
                        onClick={onClick}
                        ref={ref}
                    >
                        {value ?
                            <span className="text-muted-900">{value.replace('-', '->')}</span>
                            : <span className="text-muted-500">{selectedIconObject?.placeholder}</span>

                        }
                    </div>
                </div>
            </div>
        );
    }
);

export default CustomInput