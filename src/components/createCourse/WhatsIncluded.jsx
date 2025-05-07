import { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import { Label } from '../ui/label';
import { IoClose } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";

const WhatsIncluded = ({ setValue, getValues, errors, clearErrors, whatsIncluded }) => {
    const [input, setInput] = useState('');
    const [entries, setEntries] = useState(whatsIncluded || []);

    useEffect(() => {
        setEntries(whatsIncluded || []);
    }, [whatsIncluded]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            e.preventDefault();
            const updatedEntries = [...entries, input.trim()];
            setEntries(updatedEntries);
            setValue('whatsIncluded', updatedEntries);
            clearErrors('whatsIncluded');
            setInput('');
        }
    };

    const handleRemove = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
        setValue('whatsIncluded', updatedEntries);
    };

    return (
        <div className="w-full space-y-1">
            <Label htmlFor="whatsIncluded">What's Included</Label>

            {/* Preview List */}
            {
                entries.length > 0 && (
                    <div className="flex flex-wrap gap-2 py-2">
                        {entries.map((entry, index) => (
                            <div
                                key={index}
                                className="bg-white border font-medium border-main-400 text-main-400 text-sm px-4 py-1 rounded-full flex items-center gap-2"
                            >
                                <span>{entry}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="text-main-400"
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
                id="whatsIncluded"
                name="whatsIncluded"
                value={input}
                icon={<FaRegListAlt />}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
            />

            {/* Error Message */}
            {errors.whatsIncluded && (
                <span className="text-red-500 text-sm">{errors.whatsIncluded.message}</span>
            )}

        </div>
    );
};

export default WhatsIncluded;
