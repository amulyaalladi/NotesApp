import React from 'react'
import { useState } from 'react';

function FilterTag({ options = [], onFilterChange = () => {}, selectedTag = '' }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setIsOpen(false);
        onFilterChange(option);
    }

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-full border border-indigo-400 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
            >
                Tags{selectedTag||' '}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-slate-900 shadow-lg z-50">
                    <button
                        onClick={() => handleSelect('')}
                        className={`block w-full px-4 py-2 text-left text-sm font-semibold transition ${
                            !selectedTag 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        All Tags
                    </button>
                    <div className="border-t border-slate-700" />
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`block w-full px-4 py-2 text-left text-sm transition ${
                                selectedTag === option 
                                    ? 'bg-indigo-600 text-white font-semibold' 
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            {selectedTag === option} {option}   
                        </button>
                    ))} 
                    </div>
            )}
        </div>
    )
}

export default FilterTag;