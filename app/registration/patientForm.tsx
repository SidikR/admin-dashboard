import React, { useState } from "react";
import { Input } from "@nextui-org/input";

interface PatientFormProps {
  dataNik: string;
}

const PatientForm: React.FC<PatientFormProps> = ({ dataNik }) => {
  const [nik, setNik] = useState<string>(dataNik);
  const [patientData, setPatientData] = useState({
    NIK: "",
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

      const apiUrl = "https://your-api-endpoint.com"; // Replace with your actual API endpoint
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
      <div className="flex gap-4 mt-4">
        <Input
          type="text"
          value={nik}
          onChange={handleNikChange}
          label="NIK"
          labelPlacement="outside"
          className="w-72"
        />
        <Input
          type="text"
          value={patientData.PatientName}
          onChange={(e) =>
            setPatientData({ ...patientData, PatientName: e.target.value })
          }
          label="Nama Lengkap"
          labelPlacement="outside"
          className="w-72"
        />
        <Input
          type="text"
          value={patientData.BpjsNumber}
          onChange={(e) =>
            setPatientData({ ...patientData, BpjsNumber: e.target.value })
          }
          label="Nomor BPJS"
          labelPlacement="outside"
          className="w-72"
        />
        <Input
          type="text"
          value={patientData.MobileNumber}
          onChange={(e) =>
            setPatientData({ ...patientData, MobileNumber: e.target.value })
          }
          label="Nomor HP"
          labelPlacement="outside"
          className="w-72"
        />
        <Input
          type="text"
          value={patientData.Address}
          onChange={(e) =>
            setPatientData({ ...patientData, Address: e.target.value })
          }
          label="Alamat"
          labelPlacement="outside"
          className="w-72"
        />
        <button
          type="button"
          onClick={handleFormSubmit}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default PatientForm;
