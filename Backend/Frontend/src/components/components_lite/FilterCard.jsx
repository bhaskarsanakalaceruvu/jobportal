import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

// ✅ Consistent structure: All filters use { label, value }
const filterData = [
  {
    filterType: "Location",
    array: [
      { label: "Delhi", value: "delhi" },
      { label: "Mumbai", value: "mumbai" },
      { label: "Kolhapur", value: "kolhapur" },
      { label: "Pune", value: "pune" },
      { label: "Bangalore", value: "bangalore" },
      { label: "Hyderabad", value: "hyderabad" },
      { label: "Chennai", value: "chennai" },
      { label: "Remote", value: "remote" }
    ],
  },
  {
    filterType: "Technology",
    array: [
      { label: "Mern", value: "mern" },
      { label: "React", value: "react" },
      { label: "Data Scientist", value: "data scientist" },
      { label: "Fullstack", value: "fullstack" },
      { label: "Node", value: "node" },
      { label: "Python", value: "python" },
      { label: "Java", value: "java" },
      { label: "Frontend", value: "frontend" },
      { label: "Backend", value: "backend" },
      { label: "Mobile", value: "mobile" },
      { label: "Desktop", value: "desktop" }
    ],
  },
  {
    filterType: "Experience",
    array: [
      { label: "0-3 years", value: "0" },
      { label: "3-5 years", value: "3" },
      { label: "5-7 years", value: "5" },
      { label: "7+ years", value: "7" }
    ],
  },
  {
    filterType: "Salary",
    array: [
      { label: "0-50k", value: "0-50k" },
      { label: "50k-100k", value: "50k-100k" },
      { label: "100k-200k", value: "100k-200k" },
      { label: "200k+", value: "200k+" }
    ],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg mt-4">{data.filterType}</h2>
            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item.value} id={itemId}></RadioGroupItem>
                  <label htmlFor={itemId}>{item.label}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
