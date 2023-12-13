"use client";

import { useEffect, useState } from "react";
import fuzzysearch from "fuzzysearch";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axiosInstance from "@/utils/axiosInstance";
import PatientDetails from "./patientDetails";
import PatientForm from "../patient/page";
import { Select, SelectItem } from "@nextui-org/react";

// import PatientForm from "./patientForm";

interface SearchableNIKInputProps {
  data: string[];
  // onStateChane: any[]; // Daftar NIK yang dapat dicari
}

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

interface RegistrationData {
  PatientId: string;
  DoctorId: string;
  PolyId: string;
  Status: string;
}

interface Poly {
  ID: number;
  PolyName: string;
}

interface Doctor {
  UUID: string;
  DoctorName: string;
}

const SearchableNIKInput: React.FC<SearchableNIKInputProps> = ({ data }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [patientData, setPatientData] = useState<Patient | undefined>();
  const [inputSet, setInputSet] = useState(false);
  const [patientInputForm, setPatientInputForm] = useState(false);
  const [inputNik, setInputNik] = useState(true);
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [polyData, setPolyData] = useState<Poly[]>([]);
  const [registrationData, setRegistrationData] = useState({
    PatientId: inputValue,
    DoctorId: "",
    PolyId: "",
    Status: "",
  });

  const fetchData = async (uuid: string) => {
    try {
      const response = await axiosInstance.get(`/patient/${uuid}`);
      setPatientData(response.data);
    } catch (error) {
      setPatientData(undefined);
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataDoctor = async () => {
    try {
      const response = await axiosInstance.get(`/doctor`);
      setDoctorData(response.data);
    } catch (error) {
      setDoctorData([]);
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataPoly = async () => {
    try {
      const response = await axiosInstance.get("/poly");
      setPolyData(response.data);
    } catch (error) {
      setPolyData([]);
      console.error("Error fetching data poly : ", error);
    }
  };

  useEffect(() => {
    fetchDataDoctor();
    fetchDataPoly();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputValue(query);
    fetchData(query);

    // Lakukan pencarian fuzzy pada data NIK
    const results = data.filter((nik) => fuzzysearch(query, nik));
    setSearchResults(results);
    setInputSet(false);
  };

  const handleSetInputValue = (result: string) => {
    setInputValue(result);
    fetchData(result);
    setInputSet(true);
  };

  const handleOnBlurInput = () => {
    setInputSet(false);
  };

  function handleOnClickAddPatient() {
    setPatientInputForm(true);
    setInputSet(true);
    setInputNik(false);
  }

  const handlerSubmitRegistration = () => {
    async () => {
      try {
        const response = await axiosInstance.post("/registration", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });
      } catch (error) {
        console.error("Erorr submit registration");
      }
    };
    console.log("handle submit clicked");
  };

  console.log(registrationData);

  return (
    <div className="mx-5">
      <div className="flex items-start justify-between flex-col">
        <h2 className="mb-3">Data Pasien</h2>
        <div className="inputNik items-center">
          {inputNik ? (
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleOnBlurInput}
              placeholder="Cari NIK..."
              label="NIK"
              labelPlacement="outside"
              className="w-72"
            />
          ) : null}

          {inputValue !== "" && !inputSet ? (
            searchResults.length > 0 ? (
              <ul className="bg-slate-900 p-3 rounded-lg mt-2">
                {searchResults.map((result) => (
                  <div
                    key={result}
                    className="box bg-slate-900 m-1 p-2 rounded-lg cursor-pointer hover:bg-slate-950"
                  >
                    <li onClick={() => handleSetInputValue(result)}>
                      {result}
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="notFound flex-row gap-2 mt-2">
                <p className="text-red-500">Tidak ada data NIK</p>
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={() => handleOnClickAddPatient()}
                >
                  Tambah Pasien
                </Button>
              </div>
            )
          ) : null}
        </div>
      </div>

      {patientData !== undefined ? (
        <PatientDetails patientData={patientData} />
      ) : null}

      {patientInputForm && patientData === undefined ? (
        <div className="">
          <PatientForm dataNik={inputValue} />
        </div>
      ) : null}

      <div className="flex justify-center gap-6 mt-5">
        {/* Select Optin Doctor */}
        <Select
          label="Doctor"
          placeholder="Select an doctor"
          className="max-w-xs justify-start"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              DoctorId: e.target.value,
            })
          }
        >
          {doctorData?.map((doctor: any) => (
            <SelectItem key={doctor.uuid} value={doctor.uuid}>
              {doctor.DoctorName}
            </SelectItem>
          ))}
        </Select>

        {/* Select Optin Poly */}
        <Select
          label="Poly"
          placeholder="Select a poly"
          className="max-w-xs justify-start"
        >
          {polyData?.map((poly: any) => (
            <SelectItem key={poly.id} value={poly.PolyName}>
              {poly.PolyName}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        className="mt-4"
        variant="shadow"
        color="primary"
        type="submit"
        onClick={handlerSubmitRegistration}
      >
        Submit Registration
      </Button>
    </div>
  );
};

export default SearchableNIKInput;
