import { getGanadores } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const GanadoresCarrera = () => {
  const dispatch = useDispatch();

  const ganadores = useSelector((state) => state.ganadores);
  console.log(ganadores);
  useEffect(() => {
    dispatch(getGanadores());
  }, []);
  return <div>{ganadores.primerPuesto}</div>;
};

export default GanadoresCarrera;
