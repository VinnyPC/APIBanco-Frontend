import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Stack } from "@mui/material";

const columns: GridColDef[] = [
  { field: "data", headerName: "Dados", width: 250 },
  { field: "valor", headerName: "Valencia", width: 250 },
  { field: "tipo", headerName: "Tipo", type: "number", width: 100 },
  {
    field: "nomeResponsavel",
    headerName: "Nome do operador transacionado",
    sortable: false,
    width: 300,
  },
  {
    field: "nomeOperador",
    headerName: "Nome do responsável",
    sortable: false,
    width: 200,
  },
];

function Index() {
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operador, setOperador] = useState("");

  const fetchData = async () => {
    try {
      let url = "http://localhost:8080/transferencia";
      let queryParams = [];

      if (startDate && endDate) {
        queryParams.push(`startDate=${startDate}`);
        queryParams.push(`endDate=${endDate}`);
      }

      if (operador) {
        queryParams.push(`operador=${operador}`);
      }

      if (queryParams.length > 0) {
        url += `/transferenciasEspecificas?${queryParams.join("&")}`;
      }

      const response = await axios.get(url);
      const data = response.data;
      console.log(data);

      const mergedData = data.map((item) => ({
        id: item.id,
        data: item.data,
        valor: item.valor,
        tipo: item.tipo,
        nomeResponsavel: item.operador,
        nomeOperador: item.conta.nomeResponsavel,
      }));

      setTableData(mergedData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, operador]);

  return (
    <>
      <Stack flexDirection={"row"} padding={10} justifyContent={"space-around"}>
        <Stack flexDirection={"column"}>
          <label>Data inicial:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Stack>

        <Stack flexDirection={"column"}>
          <label>Data final:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Stack>
        <Stack flexDirection={"column"}>
          <label>Nome do operador:</label>
          <input
            type="text"
            value={operador}
            onChange={(e) => setOperador(e.target.value)}
          />
        </Stack>
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={tableData} columns={columns} />
      </div>
    </>
  );
}

export default Index;
