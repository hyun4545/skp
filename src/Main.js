import { Grid, Stack, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import settings from './settings';


function Main() {
  const qryKinds = [
    { value: "stockCode", label: "代碼" },
    { value: "stockName", label: "名稱" },
  ];

  const columns = [
    {
      field: "Code",
      headerName: "代碼",
      width: 80,
    },
    {
      field: "Name",
      headerName: "名稱",
    },
  ];

  const [selectKind, setSelectKind] = useState("stockCode");
  const [keyword, setKeyword] = useState("");
  const [allStock, setAllStock] = useState([]);
  const [selectStockIds, setSelectStockIds] = useState([]);

  function searchAllStock() {
    axios
      .get(`${settings.apiUrl}getAllStock`)
      .then((response) => {
        switch (selectKind) {
          case "stockCode":
            var arr = response.data
              .filter((d) => d.Code == keyword)
              .map((d, i) => ({ id: d.Code, Code: d.Code, Name: d.Name }));
            console.log(arr);
            setAllStock(arr);
            break;

          case "stockName":
            var arr = response.data
              .filter((d) => d.Name.includes(keyword))
              .map((d, i) => ({ id: d.Code, Code: d.Code, Name: d.Name }));
            setAllStock(arr);
            break;
        }
      })
      .catch((error) => console.log(error));
  }

  function selectKindChange(e) {
    setSelectKind(e.target.value);
  }

  function keywordChange(e) {
    setKeyword(e.target.value);
  }

  function onStockSelect(rowSelectionModel, details) {
    setSelectStockIds(rowSelectionModel);
  }

  function onAddStocks(e)
  {
    var body= selectStockIds.map((s)=>({ userId:"nini",stockCode:s }));
    console.log(body);
    axios.post(`${settings.apiUrl}saveUserStockes`,body);
  }

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid xs={12} md={12} style={{ height: "auto", maxHeight: "50%" }}>
          <Card style={{ margin: "15px", padding: "15px" }}>
            <Stack direction="row" spacing={2}>
              <Select
                value={selectKind}
                onChange={selectKindChange}
                style={{ width: "120px" }}
              >
                {qryKinds.map((k) => {
                  return (
                    <MenuItem key={k.value} value={k.value}>
                      {k.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <input
                type="text"
                value={keyword}
                onChange={keywordChange}
                style={{ width: "100%" }}
              />
              <button
                onClick={searchAllStock}
                className="btn btn-primary"
                style={{ width: "100px" }}
              >
                查詢
              </button>
            </Stack>
            <DataGrid
              rows={allStock}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              checkboxSelection={true}
              onRowSelectionModelChange={onStockSelect}
            />
            <button onClick={onAddStocks} style={{ width: "100px",background:'green',color:'white' }} className="btn">加入</button>
          </Card>
        </Grid>
        <Grid xs={12} md={12} style={{ background: "pink" }}></Grid>
      </Grid>
    </div>
  );
}

export default Main;