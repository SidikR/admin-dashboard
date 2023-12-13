// pages/create.tsx
"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const CreateBarangPage: React.FC = () => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    Deskripsi: "",
    IDDepartemen: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/barang", formData);
      router.push("/inventori");
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return (
    <div>
      <h1>Create Barang</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Barang:
          <input
            type="text"
            name="NamaBarang"
            value={formData.NamaBarang}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Deskripsi:
          <input
            type="text"
            name="Deskripsi"
            value={formData.Deskripsi}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Departemen ID:
          <input
            type="number"
            name="IDDepartemen"
            value={formData.IDDepartemen}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBarangPage;
