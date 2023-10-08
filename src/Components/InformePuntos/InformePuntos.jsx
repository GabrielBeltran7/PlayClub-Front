
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { getRecargarPuntos } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./InformePuntos.module.css"
import moment from "moment";
import * as XLSX from 'xlsx';

const InformePuntos = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const getPuntos = useSelector((state) => state.recargarpuntos);

  useEffect(() => {
    dispatch(getRecargarPuntos());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const exportToExcelPuntos = () => {
    const wsData = getPuntos.map(item => ({
      "Usuario": item.usernameAdmin,
      "Puntos Cargados": item.cantidad,
      "Precio Puntos": item.precio,
      "Cargado a": item.User.username,
      "Fecha": moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Puntos');
    XLSX.writeFile(wb, 'reportedepuntos.xlsx');
  }

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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
            onClick={() => {
              clearFilters && handleReset(clearFilters);
            }}
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
      record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: "Usuario",
      dataIndex: "usernameAdmin",
      key: "usernameAdmin",
      width: "20%",
      ...getColumnSearchProps("usernameAdmin"),
    },
    {
      title: "Puntos Cargados",
      dataIndex: "cantidad",
      key: "cantidad",
      width: "20%",
      ...getColumnSearchProps("cantidad"),
    },
    {
      title: "Precio Puntos",
      dataIndex: "precio",
      key: "precio",
      width: "20%",
      ...getColumnSearchProps("precio"),
    },
    {
      title: "Cargado a",
      dataIndex: ["User", "username"],
      width: "20%",
      ...getColumnSearchProps("User.username"),
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <div> <div className={style.buttonContainer}>
         <button  onClick={exportToExcelPuntos}>Exportar a excel 📑</button>
       </div>
         <Table columns={columns} dataSource={getPuntos} /> 
</div>

  );
};

export default InformePuntos;


// import { SearchOutlined } from "@ant-design/icons";
// import React, { useRef, useState, useEffect } from "react";
// import Highlighter from "react-highlight-words";
// import { Button, Input, Space, Table } from "antd";
// import { getRecargarPuntos } from "../../Redux/Actions";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import * as XLSX from 'xlsx';

// const InformePuntos = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef(null);
//   const dispatch = useDispatch();
//   const getPuntos = useSelector((state) => state.recargarpuntos);

//   useEffect(() => {
//     dispatch(getRecargarPuntos());
//   }, [dispatch]);

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const exportToExcelPuntos = () => {
//     const wsData = getPuntos.map(item => ({
//       "Usuario": item.usernameAdmin,
//       "Puntos Cargados": item.cantidad,
//       "Precio Puntos": item.precio,
//       "Cargado a": item.User.username,
//       "Fecha": moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
//     }));

//     const ws = XLSX.utils.json_to_sheet(wsData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Puntos');
//     XLSX.writeFile(wb, 'reportedepuntos.xlsx');
//   }

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}

//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />

//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => {
//               clearFilters && handleReset(clearFilters);
//             }}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             Close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1677ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "Usuario",
//       dataIndex: "usernameAdmin",
//       key: "usernameAdmin",
//       width: "20%",
//       ...getColumnSearchProps("usernameAdmin"),
//     },
//     {
//       title: "Puntos Cargados",
//       dataIndex: "cantidad",
//       key: "cantidad",
//       width: "20%",
//       ...getColumnSearchProps("cantidad"),
//     },
//     {
//       title: "Precio Puntos",
//       dataIndex: "precio",
//       key: "precio",
//       width: "20%",
//       ...getColumnSearchProps("precio"),
//     },
//     {
//       title: "Cargado a",
//       dataIndex: ["User", "username"],
//       width: "20%",
//       ...getColumnSearchProps("User.username"),
//     },
//     {
//       title: "Fecha",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
//     },
//   ];

//   return (
//     <div>
//       <button onClick={exportToExcelPuntos}>Exportar a excel 📑</button>
//       <Table columns={columns} dataSource={getPuntos} />
//     </div>
//   );
// };

// export default InformePuntos;

