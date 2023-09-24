import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { getAllApuestas } from "../../Redux/Actions";
import moment from "moment";
import style from "./InformeApuestas.module.css";
const columns = [
  {
    title: "Nombre",
    dataIndex: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cantidad",
    className: "column-money",
    dataIndex: "puntosapostados",
    align: "start",
  },
  {
    title: "Posible Ganancia",
    className: "column-money",
    dataIndex: "puntosganados",
    align: "start",
  },
  {
    title: "Fecha Apuesta",
    dataIndex: "createdAt",
    render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
  },
];
const InformeApuestas = () => {
  const dispatch = useDispatch();

  const allApuestas = useSelector((state) => state.allApuestas);
  console.log(allApuestas);
  useEffect(() => {
    dispatch(getAllApuestas());
  }, []);
  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <button>Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.win}
        bordered
        title={() => "Apuestas WIN"}
      />
      <div className={style.buttonContainer}>
        <button>Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.exacta}
        bordered
        title={() => "Apuestas EXACTA"}
      />
      <div className={style.buttonContainer}>
        <button>Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.trifecta}
        bordered
        title={() => "Apuestas TRIFECTA"}
      />
      <div className={style.buttonContainer}>
        <button>Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.superfecta}
        bordered
        title={() => "Apuestas SUPERFECTA"}
      />
    </div>
  );
};

export default InformeApuestas;
