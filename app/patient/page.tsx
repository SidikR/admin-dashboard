"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface PatientFormProps {
  dataNik: string;
}

const PatientForm: React.FC<PatientFormProps> = ({ dataNik }) => {
  const [nik, setNik] = useState<string>(dataNik);
  const [patientData, setPatientData] = useState({
    NIK: nik,
    PatientName: "",
    BpjsNumber: "",
    MobileNumber: "",
    Address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNikChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNik(event.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      const apiUrl = "http://localhost:8080/patient"; // Replace with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        console.log("Data successfully submitted!");
        // You can handle success, e.g., redirect or show a success message
      } else {
        console.error("Failed to submit data:", response.statusText);
        // You can handle errors, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-4 mx-10 justify-center items-center w-full h-full">
          <div className="flex flex-col gap-3 mt-4 justify-between items-center h-full w-auto min-w-[45%]">
            <Input
              type="text"
              value={nik}
              onChange={handleNikChange}
              label="NIK"
              labelPlacement="outside"
              className="w-full"
            />
            <Input
              type="text"
              value={patientData.PatientName}
              onChange={(e) =>
                setPatientData({ ...patientData, PatientName: e.target.value })
              }
              label="Nama Lengkap"
              labelPlacement="outside"
              className="w-full"
            />
            <Input
              type="text"
              value={patientData.BpjsNumber}
              onChange={(e) =>
                setPatientData({ ...patientData, BpjsNumber: e.target.value })
              }
              label="Nomor BPJS"
              labelPlacement="outside"
              className="w-full"
            />
            <Input
              type="text"
              value={patientData.MobileNumber}
              onChange={(e) =>
                setPatientData({ ...patientData, MobileNumber: e.target.value })
              }
              label="Nomor HP"
              labelPlacement="outside"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-3 mt-4 justify-between items-center h-full w-[45%] max-w-[45%]">
            <Textarea
              className="w-full"
              fullWidth
              cols={20}
              rows={15}
              value={patientData.Address}
              disableAutosize
              onChange={(e) =>
                setPatientData({ ...patientData, Address: e.target.value })
              }
              label="Alamat"
            >
              {patientData.Address}
            </Textarea>
          </div>
        </div>
        <div className="mt-4 mx-5 flex justify-end">
          <Button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            variant="shadow"
            color="success"
          >
            Add Patient
          </Button>
        </div>
      </div>
    </>
  );
};

export default PatientForm;
