import axios from "axios";
import settings from "../settings";
import { useContext } from "react";
import { MessageBoxContext } from "./MessageBox";

function useAxios() {
  const MessageBox = useContext(MessageBoxContext);

  function get(subQry, callback) {
    MessageBox.ShowSpinner();
    axios
      .get(`${settings.apiUrl}${subQry}`)
      .then((res) => {
        console.log(`${subQry}:${res}`);
        callback(res.data);
      })
      .catch((err) => {
        MessageBox.ShowMessageBox(`載入失敗!(${err})`);
      })
      .finally(() => {
        MessageBox.HideSpinner();
      });
  }

  function post(subQry, body) {
    MessageBox.ShowSpinner();
    axios
      .post(`${settings.apiUrl}${subQry}`, body)
      .then((res) => {   
      })
      .catch((err) => {
        MessageBox.ShowMessageBox(`儲存失敗!(${err.response.data})`);
      })
      .finally(() => {
        MessageBox.HideSpinner();        
      });
  }

  return [get, post];
}

export default useAxios;
