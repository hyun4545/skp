import { Grid, Stack, Select, MenuItem, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Card } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./helpers/useAxios";
import { MessageBoxContext } from "./helpers/MessageBox";

function Main() { 
  const [selectKind, setSelectKind] = useState("stockName");
  const [keyword, setKeyword] = useState("");
  const [allStock, setAllStock] = useState([]);
  const [selectStockIds, setSelectStockIds] = useState([]);
  const [userStocks,setUserStocks]=useState([]);
  const { userId } = useParams();
  const MessageBox=useContext(MessageBoxContext);
  const [ApiGet, ApiPost] = useAxios();

  const qryKinds = [
    { value: "stockName", label: "名稱" },
    { value: "stockCode", label: "代碼" },    
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

  function searchAllStock() {
    
    ApiGet(`getAllStock`,(data) => {
        switch (selectKind) {
          case "stockCode":
            var arr = data
              .filter((d) => d.Code == keyword)
              .map((d, i) => ({ id: d.Code, Code: d.Code, Name: d.Name }));
            console.log(arr);
            setAllStock(arr);
            break;

          case "stockName":
            var arr = data
              .filter((d) => d.Name.includes(keyword))
              .map((d, i) => ({ id: d.Code, Code: d.Code, Name: d.Name }));
            setAllStock(arr);
            break;
        }
      })
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

  function onAddStocks(e) {
    var body = selectStockIds.map((s) => ({ userId:userId, stockCode: s }));
    ApiPost(`saveUserStockes`, body);
  }

  return (
    <Box style={{ background: "#c0d8f0" }} minHeight="100vh">
      <Grid container display="flex" justifyContent="center">
        <Grid xs={12} md={10}>
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
            <button
              onClick={onAddStocks}
              style={{ width: "100px", background: "green", color: "white" }}
              className="btn"
            >
              加入
            </button>
          </Card>
        </Grid>
        <Grid xs={12} md={12} style={{ background: "pink" }}></Grid>
      </Grid>
    </Box>
  );
}

export default Main;
