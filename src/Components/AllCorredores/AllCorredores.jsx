import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { getCorredores } from "../../Redux/Actions";
import { Table } from "antd";

const AllCorredores = () => {
  const allCorredores = useSelector((state) => state.corredor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCorredores());
  }, [dispatch]);

  const allCorredoresFilter = allCorredores && allCorredores.filter(
    (corredor) => corredor.activo === true
  );

  console.log(allCorredoresFilter);
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
      title: "Action",
      key: "operation",
      width: "1%",
      fixed: "right",
      render: (_, record) => (
        <a onClick={() => handleSubmit(record)}>Deshabilitar Corredor</a>
      ),
    },
  ];
  const handleSubmit = (record) => {
    console.log("recorddddd", record);
  };
  return (
    <Table
      columns={columns}
      dataSource={allCorredoresFilter}
      scroll={{
        x: 1300,
      }}
    />
  );
};
export default AllCorredores;
