import { Box, Stack } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useState } from "react";

function IndexInputs({ fetchData }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operador, setOperador] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetchData(startDate, endDate, operador);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack flexDirection={"row"} gap={10}>
          <Stack flexDirection={"column"}>
            <label htmlFor="startDate">Data de início</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Stack>
          <Stack flexDirection={"column"}>
            <label htmlFor="endDate">Data de fim</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Stack>
          <Stack flexDirection={"column"}>
            <label htmlFor="nomeOperador">Nome do operador transacionado</label>
            <input
              id="nomeOperador"
              name="nomeOperador"
              value={operador}
              onChange={(event) => setOperador(event.target.value)}
            />
          </Stack>
        </Stack>
        <input type="submit" value={"Pesquisar"} />
      </form>
    </>
  );
}

export default IndexInputs;
