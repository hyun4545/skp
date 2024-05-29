import logo from "./logo.svg";
import "./App.css";
import { Grid, Stack, Select, MenuItem } from "@mui/material";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function App() {
  const qryKinds = [
    { value: "stockCode", label: "代碼" },
    { value: "stockName", label: "名稱" },
  ];

  const [selectKind, setSelectKind] = useState("stockCode");
  const [keyword, setKeyword] = useState("");
  const [allStock, setAllStock] = useState([]);

  function searchAllStock() {
    axios
      .get("https://mis.twse.com.tw/stock/api/getOddInfo.jsp?ex_ch=tse_2308.tw")
      .then((response) => {
        console.log(response.json);
       /* setAllStock(response.data);
        switch (selectKind) {
          case "stockCode":
            var arr = response.data.filter((d) => d.Code == keyword);
            setAllStock(arr);
            break;

          case "stockName":
            var arr = response.data.filter((d) => d.Name.includes(keyword));
            setAllStock(arr);
            break;
        }*/
      })
      .catch((error) => console.log(error));
  }

  function selectKindChange(e) {
    setSelectKind(e.target.value);
  }

  function keywordChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid xs={12} md="auto" style={{ height: "auto", maxHeight: "50%" }}>
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
            <table
              className="table table-bordered"
              style={{ width: "90%", margin: "10px" }}
            >
              <tr>
                <th style={{ width: "20%" }}>代碼</th>
                <th style={{ width: "60%" }}>名稱</th>
                <th style={{ width: "20%" }}></th>
              </tr>
              {allStock.map((a) => {
                return (
                  <tr>
                    <td style={{ width: "20%" }}>{a.Code}</td>
                    <td style={{ width: "60%" }}>{a.Name}</td>
                    <td style={{ width: "20%" }}></td>
                  </tr>
                );
              })}
            </table>
          </Card>
        </Grid>
        <Grid xs={12} md style={{ background: "pink" }}></Grid>
      </Grid>
    </div>
  );
}

export default App;
