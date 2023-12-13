// PatientDetails.tsx
import React from "react";
import { Input } from "@nextui-org/input";

interface PatientDetailsProps {
  patientData?: {
    PatientName?: string;
    BpjsNumber?: string;
    MobileNumber?: string;
    Address?: string;
  };
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientData }) => (
  <>
    <div className="flex gap-4 mt-4 justify-between w-full">
      <Input
        type="text"
        value={patientData?.PatientName || ""}
        label="Nama Lengkap"
        labelPlacement="outside"
        className="w-full"
      />
      <Input
        type="text"
        value={patientData?.BpjsNumber || ""}
        label="Nomor BPJS"
        labelPlacement="outside"
        className="w-full"
      />
      <Input
        type="text"
        value={patientData?.MobileNumber || ""}
        label="Nomor HP"
        labelPlacement="outside"
        className="w-full"
      />
      <Input
        type="text"
        value={patientData?.Address || ""}
        label="Alamat"
        labelPlacement="outside"
        className="w-full"
      />
    </div>
  </>
);

export default PatientDetails;
