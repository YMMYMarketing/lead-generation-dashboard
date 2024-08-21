import React from 'react';

export const Card = ({ children }) => (
  <div className="border rounded-lg p-4 shadow-md">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="font-bold text-lg mb-2">{children}</div>
);

export const CardContent = ({ children }) => (
  <div>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const Select = ({ onValueChange, defaultValue, children }) => (
  <select 
    onChange={(e) => onValueChange(e.target.value)} 
    defaultValue={defaultValue}
    className="border rounded p-2"
  >
    {children}
  </select>
);

export const SelectTrigger = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const SelectValue = ({ placeholder }) => (
  <span>{placeholder}</span>
);

export const SelectContent = ({ children }) => (
  <>{children}</>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);