import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Select  from 'react-select'

function App() {
  const qryKinds=[{value:'stockCode',label:'代碼'},{value:'stockName',label:'名稱'}];
  return (
    <div className="App">
      <div style={{ display:"inline-flex", width: "90%" }}>
        <div style={{ }}>
          <div style={{ display: "inline-flex",marginTop:'20px' }}>
            <Select options={qryKinds} />
            <input type="text" styles={{flex:'1'}}/>
            <button style={{width:'70px'}}>查詢</button>
          </div>
          <table style={{margin:'10px',width:'90%',border:'solid 1px blue'}}>
            <tr>
              <th style={{width:'20%',border:'solid 1px blue'}}>代碼</th>
              <th style={{width:'60%',border:'solid 1px blue'}}>名稱</th>
              <th style={{width:'20%',border:'solid 1px blue'}}></th>
            </tr>
          </table>
        </div>
        <div style={{ background: "pink",flex:"1",height:"100px" }}></div>
      </div>
    </div>
  );
}

export default App;
