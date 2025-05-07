import { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import { Label } from '../ui/label';
import { IoClose } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { TbUserQuestion } from "react-icons/tb";

const WhoThisCourseIsFor = ({ setValue, getValues, errors, whoThisCourseIsFor, clearErrors }) => {
    const [input, setInput] = useState('');
    const [entries, setEntries] = useState(whoThisCourseIsFor || []);

    useEffect(() => {
        if (whoThisCourseIsFor) {
            setEntries(whoThisCourseIsFor);
        }
    }, [whoThisCourseIsFor])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            const updatedEntries = [...entries, input.trim()];
            setEntries(updatedEntries);
            setValue('whoThisCourseIsFor', updatedEntries);
            clearErrors('whoThisCourseIsFor');
            setInput('');
        }
    };

    const handleRemove = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
        setValue('whoThisCourseIsFor', updatedEntries);
    };

    return (
        <div className="w-full space-y-1">
            <Label htmlFor="whoThisCourseIsFor">Who this course is for</Label>

            {/* Preview List */}
            {
                entries.length > 0 && (
                    <div className="flex flex-col gap-y-1 py-2">
                        {entries.map((entry, index) => (
                            <div
                                key={index}
                                className="w-full bg-main-400 px-3 py-1 rounded-md text-dark-50 justify-between flex items-center gap-2"
                            >
                                <div className='flex gap-x-2 items-center'>
                                    <GoDot />
                                    <span>{entry}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="text-dark-50"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        ))}
                    </div>
                )
            }

            {/* Input Field */}
            <InputField
                type="text"
                id="whoThisCourseIsFor"
                name="whoThisCourseIsFor"
                value={input}
                icon={<TbUserQuestion />}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
            />

            {
                errors.whoThisCourseIsFor && (
                    <span className="text-red-500 text-sm">{errors.whoThisCourseIsFor.message}</span>
                )
            }

        </div>
    );
};

export default WhoThisCourseIsFor;
