import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { getCorredores } from "../../Redux/Actions";
const AllCorredores = () => {
  const allCorredores = useSelector((state) => state.corredor);
  const dispatch = useDispatch();
  console.log("all corredores", allCorredores);
  useEffect(() => {
    dispatch(getCorredores());
  }, [allCorredores.length]);
  return (
    <div>
      <h1>corredores</h1>
    </div>
  );
};

export default AllCorredores;
