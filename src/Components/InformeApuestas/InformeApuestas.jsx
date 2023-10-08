import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { getAllApuestas } from "../../Redux/Actions";
import * as XLSX from 'xlsx';
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
  
  const Win = allApuestas.win
  const Exacta = allApuestas.exacta
  
  const Trifecta = allApuestas.trifecta
  const Superfecta = allApuestas.superfecta

/***************************************************************************************** */
if(Win){
  Win.forEach((apuestasWin) => {
    // Formatea la fecha en el formato deseado
    apuestasWin.createdAt = moment (apuestasWin.createdAt).format("YYYY-MM-DD HH:mm:ss")
    apuestasWin.updatedAt = moment (apuestasWin.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  }); 
}
const exportToExcelWin = () => {
  const ws = XLSX.utils.json_to_sheet(Win);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'win');
  XLSX.writeFile(wb, 'ApuestaWin.xlsx');
}
/***************************************************************************************** */
if(Exacta){
  Exacta.forEach((apuestaExacta) => {
    apuestaExacta.createdAt = moment (apuestaExacta.createdAt).format("YYYY-MM-DD HH:mm:ss")
    apuestaExacta.updatedAt = moment (apuestaExacta.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  });
}
  const exportToExcelExacta = () => {
    const ws = XLSX.utils.json_to_sheet(Exacta);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exacta');
    XLSX.writeFile(wb, 'ApuestaExacta.xlsx');
  };
/***************************************************************************************** */
if(Trifecta){
  Trifecta.forEach((apuestaTrifecta) => {
    // Formatea la fecha en el formato deseado
    apuestaTrifecta.createdAt = moment (apuestaTrifecta.createdAt).format("YYYY-MM-DD HH:mm:ss")
    apuestaTrifecta.updatedAt = moment (apuestaTrifecta.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  });
}
  const exportToExcelTrifecta = () => {
    const ws = XLSX.utils.json_to_sheet(Trifecta);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Trifecta');
    XLSX.writeFile(wb, 'ApuestaTrifecta.xlsx');
  };
/********************************************************************************************** */
if(Superfecta){
  Superfecta.forEach((apuestaSuperfecta) => {
    // Formatea la fecha en el formato deseado
    apuestaSuperfecta.createdAt = moment (apuestaSuperfecta.createdAt).format("YYYY-MM-DD HH:mm:ss")
    apuestaSuperfecta.updatedAt = moment (apuestaSuperfecta.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  });
}
 const exportToExcelSuperfecta = () => {
    const ws = XLSX.utils.json_to_sheet(Superfecta);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Superfecta');
    XLSX.writeFile(wb, 'ApuestaSuperfecta.xlsx');
  };

  useEffect(() => {
    dispatch(getAllApuestas());
  }, []);
  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <button onClick={exportToExcelWin} >Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.win}
        bordered
        title={() => "Apuestas WIN"}
      />
      <div className={style.buttonContainer}>
        <button onClick={exportToExcelExacta} >Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.exacta}
        bordered
        title={() => "Apuestas EXACTA"}
      />
      <div className={style.buttonContainer}>
        <button onClick={exportToExcelTrifecta}>Exportar a excel 📑</button>
      </div>
      <Table
        columns={columns}
        dataSource={allApuestas.trifecta}
        bordered
        title={() => "Apuestas TRIFECTA"}
      />
      <div className={style.buttonContainer}>
        <button onClick={exportToExcelSuperfecta}>Exportar a excel 📑</button>
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
