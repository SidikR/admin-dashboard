// pages/inventori/[uuid].tsx
"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function Page({ params }: { params: { uuid: string } }) {
  const [barangDetail, setBarangDetail] = useState({
    UUID: "",
    NamaBarang: "",
    Deskripsi: "",
    departemen_name: "",
  });

  const uuid = params.uuid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/barang/${uuid}`);
        setBarangDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (uuid) {
      fetchData();
    }
  }, [uuid]);

  if (!barangDetail.UUID) {
    return <div>Loading...</div>; // or handle loading state accordingly
  }
  return (
    <div>
      <h1>Barang Detail</h1>
      <p>ID: {barangDetail.UUID}</p>
      <p>Departemen : {barangDetail.departemen_name}</p>
      <p>Nama Barang: {barangDetail.NamaBarang}</p>
      <p>Deskripsi: {barangDetail.Deskripsi}</p>
    </div>
  );
}
