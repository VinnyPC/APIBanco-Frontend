import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";


const columns: GridColDef[] = [
  { field: "data", headerName: "Dados", width: 200 },
  { field: "valor", headerName: "Valencia", width: 200 },
  {
    field: "tipo",
    headerName: "Tipo",
    type: "number",
    width: 200,
  },
  {
    field: "nomeResponsavel",
    headerName: "Nome do operador transacionado",
    description: "Esta coluna possui um 'value getter' e não é ordenável.",
    sortable: false,
    width: 200,
  },
  {
    field: "nomeOperador",
    headerName: "Nome do operador transacionado",
    description: "Esta coluna possui um 'value getter' e não é ordenável.",
    sortable: false,
    width: 200,
  },
];

function Index() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseTransferencia = await axios.get(
        "http://localhost:8080/transferencia"
      );
      const dataTransferencia = responseTransferencia.data;
      // console.table(dataTransferencia)

      const responseConta = await axios.get("http://localhost:8080/conta");
      const dataConta = responseConta.data;

      const mergedData = dataTransferencia.map((item) => {
        const conta = dataConta.find((conta) => conta.idConta === item.contaId);
        // const nomeResponsavel = conta?.nomeResponsavel || "";
        
        
        console.log(item.operador)
        return {
          id: item.id,
          data: item.data,
          valor: item.valor,
          tipo: item.tipo,
          nomeResponsavel: item.operador,
          nomeOperador: item.conta.nomeResponsavel,
        };
      });
      
      setTableData(mergedData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={tableData} columns={columns} />
    </div>
  );
}

export default Index;
