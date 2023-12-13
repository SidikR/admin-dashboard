// components/StateSelector.tsx
"use client";

import axiosInstance from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Select from "react-select";

interface State {
  label: string;
  value: string;
}

interface StateSelectorProps {
  onSelect: (value: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<State[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get(`/patient`);
        const data = response.data;

        // Format data retrieved from the API
        const formattedOptions: State[] = data.map((item: any) => ({
          value: item.NIK,
          label: item.NIK,
        }));

        // Add the default "Select a state..." option
        const allOptions: State[] = [
          { label: "Select a state...", value: "" },
          ...formattedOptions,
        ];

        setOptions(allOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const handleStateChange = (selectedOption: State | null) => {
    onSelect(selectedOption ? selectedOption.value : "");
  };

  return (
    <Select
      options={options}
      placeholder="Pick a state..."
      onChange={handleStateChange}
    />
  );
};

export default StateSelector;
