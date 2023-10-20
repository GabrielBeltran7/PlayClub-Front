
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getCorredores, deleteCorredor } from "../../Redux/Actions";
import { Table, Input, Space } from "antd";
import style from "./AllCorredores.module.css"

import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import moment from "moment";

const AllCorredores = () => {
  const allCorredores = useSelector((state) => state.corredor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCorredores());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  const allCorredoresFilter = allCorredores && allCorredores.filter(
    (corredor) => corredor.activo === true && corredor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (allCorredoresFilter) {
    allCorredores.forEach((user) => {
      // Formatea la fecha en el formato deseado
      user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
      user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    });
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allCorredoresFilter);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Corredores");

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, "corredores.xlsx");
  };

  const actualizar = ()=>{
    dispatch(getUserById());
  }


    


  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: `Estás seguro de borrar al Corredor ${nombre}?`,
      text: `Estás por borrar a ${nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCorredor(id))
        Swal.fire("Borrado!", "el Corredor fue borrado correctamente.", "success");
      }
    });

    console.log(id);
  };

  const columns = [
    {
      title: "Nombre corredor",
      width: "1%",
      dataIndex: "nombre",
      key: "nombre",
      fixed: "left",
    },
    {
      title: "Numero corredor",
      width: "1%",
      dataIndex: "numero",
      key: "numero",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "1",
      width: "5%",
    },
    {
      title: "Borrar Corredor",
      key: "action",
      width: "1%",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id, record.nombre)}>Borrar</a>
        </Space>
      ),
    }
  
  ];
  

  const handleSubmit = (record) => {
    console.log("recorddddd", record);
  };

  return (
    <div>
      <div className={style.contenedorbotones}>
        <button  onClick={actualizar}>Actualizar</button>
      <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>
      <Input
        placeholder="Buscar corredor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={allCorredoresFilter}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default AllCorredores;


