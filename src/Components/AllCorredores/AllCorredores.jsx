
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getCorredores } from "../../Redux/Actions";
import { Table, Input } from "antd";

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
    // {
    //   title: "Action",
    //   key: "operation",
    //   width: "1%",
    //   fixed: "right",
    //   render: (_, record) => (
    //     <a onClick={() => handleSubmit(record)}>Deshabilitar Corredor</a>
    //   ),
    // },
  ];

  const handleSubmit = (record) => {
    console.log("recorddddd", record);
  };

  return (
    <div>
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




// import { useDispatch, useSelector } from "react-redux";
// import React, { useRef, useState, useEffect } from "react";
// import { getCorredores } from "../../Redux/Actions";
// import { Table } from "antd";

// const AllCorredores = () => {
//   const allCorredores = useSelector((state) => state.corredor);
//   console.log("allCorredores",allCorredores)
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getCorredores());
//   }, [dispatch]);

//   const allCorredoresFilter = allCorredores && allCorredores.filter(
//     (corredor) => corredor.activo === true
//   );

//   console.log(allCorredoresFilter);
//   const columns = [
//     {
//       title: "Nombre corredor",
//       width: "1%",
//       dataIndex: "nombre",
//       key: "nombre",
//       fixed: "left",
//     },
//     {
//       title: "Numero corredor",
//       width: "1%",
//       dataIndex: "numero",
//       key: "numero",
//       sorter: true,
//       fixed: "left",
//     },
//     {
//       title: "Descripcion",
//       dataIndex: "descripcion",
//       key: "1",
//       width: "5%",
//     },
//     {
//       title: "Action",
//       key: "operation",
//       width: "1%",
//       fixed: "right",
//       render: (_, record) => (
//         <a onClick={() => handleSubmit(record)}>Deshabilitar Corredor</a>
//       ),
//     },
//   ];
//   const handleSubmit = (record) => {
//     console.log("recorddddd", record);
//   };
//   return (
//     <Table
//       columns={columns}
//       dataSource={allCorredoresFilter}
//       scroll={{
//         x: 1300,
//       }}
//     />
//   );
// };
// export default AllCorredores;
