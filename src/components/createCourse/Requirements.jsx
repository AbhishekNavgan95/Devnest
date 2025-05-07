import { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import { Label } from '../ui/label';
import { IoClose } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { FaListUl } from "react-icons/fa";

const Requirements = ({ setValue, getValues, errors, clearErrors, requirements }) => {
    const [input, setInput] = useState('');
    const [entries, setEntries] = useState(requirements || []);

    useEffect(() => {
        if (requirements) {
            setEntries(requirements);
        }
    }, [requirements])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            const updatedEntries = [...entries, input.trim()];
            setEntries(updatedEntries);
            setValue('requirements', updatedEntries);
            clearErrors('requirements');
            setInput('');
        }
    };

    const handleRemove = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
        setValue('requirements', updatedEntries);
    };

    return (
        <div className="w-full space-y-1">
            <Label htmlFor="requirements">Requirements / Instructions</Label>

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
                id="requirements"
                name="requirements"
                value={input}
                icon={<FaListUl />}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
            />

            {
                errors.requirements && (
                    <span className="text-red-500 text-sm">{errors.requirements.message}</span>
                )
            }

        </div>
    );
};

export default Requirements;
