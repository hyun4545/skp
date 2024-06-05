import {
  TextField,
  Select,
  MenuItem,
  Stack,
  Button,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useContext, useEffect, useState } from "react";
import { MessageBoxContext } from "./helpers/MessageBox";
import useAxios from "./helpers/useAxios";
import { useNavigate,Link } from "react-router-dom";

function User(props) {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [allUser, setAllUser] = useState();
  const [selectUserId, setSelectUserId] = useState();
  const [ApiGet, ApiPost] = useAxios();
  const MessageBox = useContext(MessageBoxContext);
  const navigator = useNavigate();

  function loadAllUsers() {
    ApiGet("getAllUser", (data) => {
      setAllUser(data);
    });
  }

  useEffect(() => {
    loadAllUsers();
  }, []);

  function onAddUser() {
    if (!userId) {
      MessageBox.ShowMessageBox("請輸入使用者代碼!");
      return;
    }
    if (!userName) {
      MessageBox.ShowMessageBox("請輸入使用者名稱!");
      return;
    }
    ApiPost("addUser", { name: userName, code: userId });
  }

  function onUserNameChange(e) {
    setUserName(e.target.value);
  }

  function onUserIdChange(e) {
    setUserId(e.target.value);
  }

  function onSelectUserIdChange(e) {
    setSelectUserId(e.target.value);
  }

  function onEnter()
  {
    if(!selectUserId)
        {
            MessageBox.ShowMessageBox('請選擇使用者!');
            return;
        }
    navigator(`/Main/${selectUserId}`);
  }

  return (
    <Box
      style={{ background: "#c0d8f0" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card variant="outlined" style={{ padding: "50px", background: "white" }}>
        <Stack xs={8} md={4} spacing={5}>
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="使用者代號" onChange={onUserIdChange} />
            <TextField
              fullWidth
              label="使用者名稱"
              onChange={onUserNameChange}
            />
            <Button style={{background:'#3c3c73',color:'white'}} onClick={onAddUser}>新增</Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">選擇使用者</InputLabel>
              <Select
                onChange={onSelectUserIdChange}
                value={selectUserId}
                label="選擇使用者"
                labelId="demo-simple-select-label"
              >
                {allUser &&
                  allUser.map((u) => {
                    return (
                      <MenuItem key={u._id} value={u._id}>
                        {u.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
              <Button onClick={onEnter} style={{background:'#3c3c73',color:'white'}}>進入</Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

export default User;
