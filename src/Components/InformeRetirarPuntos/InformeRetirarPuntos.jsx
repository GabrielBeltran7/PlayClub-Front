import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import moment from "moment";
import { apdateRoluser, getPuntosApostados } from "../../Redux/Actions";
import style from "./InformeRetirarPuntos.module.css";

import { SearchOutlined } from "@ant-design/icons";


const InformeRetirarPuntos = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const puntospagados = useSelector((state) => state.puntospagados);
  console.log("puntos pagados", puntospagados);

  const dispatch = useDispatch();
  const [rol, setRol] = useState(false);

  useEffect(() => {
    dispatch(getPuntosApostados());
  }, [dispatch]);

  useEffect(() => {
    if (puntospagados) {
      puntospagados.forEach((user) => {
        // Formatea la fecha en el formato deseado
        user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
        user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      });
    }
  }, [puntospagados]);

  const exportToExcel = () => {
    const dataToExport = puntospagados.map((item) => ({
      "SubAdministrador": item.subadmin,
      "Puntos que tenia": item.cantidadquehabia,
      "Puntos Pagados": item.cantidadpuntospagados,
      "Nueva cantidad": item.cantidadtotal,
      "Fecha de creacion": item.createdAt,
      "Fecha de Actualizacion": item.updatedAt,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Puntospagados');

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, 'puntospagados.xlsx');
  };

  const handleChange = (record) => (event) => {
    dispatch(
      apdateRoluser({
        username: record.username,
        rol: event,
      })
    );
    setRol(!rol);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "SubAdministrador",
      dataIndex: "subadmin",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Retirado a",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Puntos que tenia",
      dataIndex: "cantidadquehabia",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Puntos Pagados",
      dataIndex: "cantidadpuntospagados",
      key: "cantidadtotal",
      ...getColumnSearchProps("cantidadtotal"),
    },
    {
      title: "Nueva cantidad",
      dataIndex: "cantidadtotal",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Fecha de creacion",
      dataIndex: "createdAt",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Fecha de Actualizacion",
      dataIndex: "updatedAt",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
  ];

  return (
    <div>
      <div className={style.botonexcel}>
        <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>

      <Table columns={columns} dataSource={puntospagados} />
      <div>
        <div className={style.containerAviso}>
          <label className={style.aviso}>
            Para cargar puntos a un usuario, presiona sobre el nombre de un
            usuario y te llevará al formulario para cargar puntos al usuario
            seleccionado.
          </label>
        </div>
      </div>
    </div>
  );
};

export default InformeRetirarPuntos;


