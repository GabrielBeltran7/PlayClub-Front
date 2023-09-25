import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { getCarrera, actDesactCarrera } from "../../Redux/Actions";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import style from "./AllCarreras.module.css";

const AllCorredores = () => {
  const carrera = useSelector((state) => state.carrera);
  const dispatch = useDispatch();

  console.log(carrera);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
            close
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
      title: "Nombre Carrera",
      dataIndex: "nombrecarrera",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Creador Carrera",
      dataIndex: "usernameAdmin",
      key: "age",
      width: "10%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Porcentaje WIN",
      dataIndex: "porcentajeWin",
      key: "age",
      width: "5%",
    },
    {
      title: "Porcentaje EXACTA",
      dataIndex: "porcentajeExacta",
      key: "age",
      width: "5%",
    },
    {
      title: "Porcentaje TRIFECTA",
      dataIndex: "porcentajeTrifecta",
      key: "age",
      width: "5%",
    },
    {
      title: "Porcentaje Superfecta",
      dataIndex: "porcentajeSuperfecta",
      key: "age",
      width: "5%",
    },
    {
      title: "Fecha Creacion",
      dataIndex: "fechadecarrera",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "Desactivar Carrera",
      key: "operation",
      fixed: "right",
      width: "10%",
      render: (text, record) => (
        <div className={style.ActDesact}>
          <a onClick={() => handleSubmitDesactivarCarrera(record)}>
            {record.actydescarrera ? "Desactivar carrera" : "Activar Carrera"}
          </a>
        </div>
      ),
    },
    {
      title: "Desactivar Ganadores",
      key: "operation",
      fixed: "right",
      width: "10%",
      render: (text, record) => (
        <a onClick={() => handleSubmitDesactivarGanadores(record)}>
          {record.actydescarrerayganadores
            ? "Desactivar ganadores"
            : "Activar ganadores"}
        </a>
      ),
    },
  ];
  const handleRefresh = (event) => {
    event.preventDefault();
    dispatch(getCarrera());
  };
  const handleSubmitDesactivarGanadores = (record) => {
    if (record.actydescarrerayganadores) {
      dispatch(
        actDesactCarrera({
          id: record.id,
          rol: "desactivarcarrerayganadores",
        })
      );
    } else {
      dispatch(
        actDesactCarrera({
          id: record.id,
          rol: "activarcarrerayganadores",
        })
      );
    }
  };
  const handleSubmitDesactivarCarrera = (record) => {
    if (record.actydescarrera) {
      dispatch(
        actDesactCarrera({
          id: record.id,
          rol: "desactivarcarrera",
        })
      );
    } else {
      dispatch(
        actDesactCarrera({
          id: record.id,
          rol: "activarcarrera",
        })
      );
    }
  };
  useEffect(() => {
    dispatch(getCarrera());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.containerButton}>
        <Button type="primary" onClick={handleRefresh}>
          Actualizar Tabla
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={carrera}
        scroll={{
          x: true,
        }}
      />
    </div>
  );
};
export default AllCorredores;
