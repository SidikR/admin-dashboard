// app/inventori/page.tsx

// Your main component
"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import ReusableTable from "@/components/ReusableTable";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

interface Barang {
  NamaBarang: string;
  Deskripsi: string;
  IDDepartemen: string;
  Stok: string;
  Kondisi: string;
  DepartemenName: string;
  UUID: string;
}

interface TableColumn {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface Path {
  pathName: string;
}

const columns: TableColumn[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "NamaBarang", sortable: true },
  { name: "DEPARTMENT", uid: "DepartemenName", sortable: true },
  { name: "DESCRIPTION", uid: "Deskripsi" },
  { name: "STOK", uid: "Stok", sortable: true },
  { name: "KONISI", uid: "Kondisi", sortable: true },
  { name: "UUID", uid: "UUID" },
  { name: "ACTIONS", uid: "actions" },
];

const path: Path = { pathName: "/inventori" };

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const InventoriPage: React.FC = () => {
  const router = useRouter();
  const [barangList, setBarangList] = useState<Barang[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/barang");
        setBarangList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(barangList);

  const barangData = barangList.map((barang, index) => ({
    id: index + 1,
    NamaBarang: barang.NamaBarang,
    DepartemenName: barang.DepartemenName,
    Deskripsi: barang.Deskripsi,
    Stok: barang.Stok,
    Kondisi: barang.Kondisi,
    UUID: barang.UUID,
  }));

  // console.log(path.pathName);
  return (
    <ReusableTable
      data={barangData}
      path={path.pathName}
      columns={columns}
      statusOptions={statusOptions}
      renderCell={(item, columnKey) => {
        if (columnKey === "actions") {
          return (
            <div>
              <Button
                as="a"
                variant="ghost"
                onClick={() => router.push(`/inventori/${item.UUID}`)}
              >
                Detail
              </Button>
            </div>
          );
        }
        return <div>{item[columnKey as keyof typeof item]}</div>;
      }}
    />
  );
};

export default InventoriPage;
