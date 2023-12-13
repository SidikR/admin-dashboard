// "use client" dan import statements

"use client";
import React, { useEffect, useState } from "react";
import SearchableNIKInput from "@/app/registration/nikSelector";
import axiosInstance from "@/utils/axiosInstance";
import PatientDetails from "./patientDetails";

interface Patient {
  NIK: string;
  PatientName: string;
  BpjsNumber: string;
  MobileNumber: string;
  Address: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

const Home: React.FC = () => {
  const [nikData, setNikData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/patient");
        const nikList = response.data.map((patient: Patient) => patient.NIK);
        setNikData(nikList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChildState = (childState: any) => {};

  console.log(nikData);

  return (
    <div>
      <SearchableNIKInput data={nikData} />
      {/* <PatientDetails patientData={patientData} /> */}
    </div>
  );
};

export default Home;
