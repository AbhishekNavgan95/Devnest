import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HiMiniSlash } from "react-icons/hi2";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

import { useCategoryStore } from '@/stores/useCategoryStore';
import Container from '../common/Container';

const CoursesLayoutNav = () => {
    const [currentCategory, setCurrentCategory] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    const { categories } = useCategoryStore();
    const { category, topic } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (category) setCurrentCategory(category);
        if (topic) setSelectedTopic(topic);
    }, [category, topic]);

    const handleCategoryChange = (val) => {
        const selectedCat = categories.find((cat) => cat._id === val);
        const firstTopic = selectedCat?.topics?.[0]?._id;

        if (firstTopic) {
            navigate(`/courses/${val}/${firstTopic}`);
        } else {
            navigate(`/courses/${val}`);
        }
    };

    const handleTopicChange = (val) => {
        if (currentCategory) {
            navigate(`/courses/${currentCategory}/${val}`);
        }
    };

    const currentCategoryObj = categories?.find(cat => cat._id === currentCategory);
    if(!currentCategoryObj) {
        return null; // or handle the case when the category is not found
    }
    const topics = currentCategoryObj?.topics || [];

    return (
        <div className='w-full px-0 md:px-14 flex justify-start items-center border-b shadow-md shadow-dark-400 h-12 md:h-14'>
            <Container>
                <div className='w-full flex items-center justify-start gap-x-2 md:gap-x-2 text-xs md:text-sm'>
                    <span>Courses</span>
                    <HiMiniSlash />

                    {/* Category Select */}
                    <Select value={currentCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className='border-0 shadow-none px-0 text-xs md:text-sm'>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories?.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <HiMiniSlash />

                    {/* Topic Select */}
                    <Select value={selectedTopic} onValueChange={handleTopicChange}>
                        <SelectTrigger className='border-0 shadow-none px-0 text-xs md:text-sm'>
                            <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {topics.map((topic) => (
                                    <SelectItem key={topic._id} value={topic._id}>
                                        {topic.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </Container>
        </div >
    );
};

export default CoursesLayoutNav;
