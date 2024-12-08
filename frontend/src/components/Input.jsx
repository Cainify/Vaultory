import React from 'react';

const Input = ({ label, name, type = 'text', value, onChange, placeholder, required = true }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default Input;
