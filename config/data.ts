
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "DEPATEMEN", uid: "departemen", sortable: true},
  {name: "DESKRIPSI", uid: "deskripsi"},
  {name: "UPDATED AT", uid: "updated_at", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

interface Barang {
  NamaBarang: string;
  Deskripsi: string;
  IDDepartemen:number;
  UpdatedAt:string;
}

const [barangList, setBarangList] = useState<Barang[]>([]);
  // const token = useSelector((state: RootState) => state.auth.dataLogin?.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const headers = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        const response = await axiosInstance.get("/barang");
        setBarangList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const barangData = barangList.map((barang, index) => ({
    id: index + 1,
    name: barang.NamaBarang,
    departemen: barang.IDDepartemen, // Sesuaikan dengan data departemen dari barang jika ada
    deskripsi: barang.Deskripsi,
    updated_at: barang.UpdatedAt, // Sesuaikan dengan waktu terakhir barang diperbarui jika ada
  }));

export {columns,barangData, statusOptions};
