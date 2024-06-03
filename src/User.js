import {
  TextField,
  Select,
  MenuItem,
  Stack,
  Button,
  Grid,
  Box,
  Container,
  InputLabel,
  FormControl,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { Link } from "react-router-dom";

function User(props) {
  const [addUser, setAddUser] = useState();

  function onAddUser() {
    console.log(`onAddUser:${addUser}`);
    console.log(props);
    props.spinnerOpen();
    var millisecondsToWait = 2000;
    setTimeout(function () {
      props.spinnerClose();
    }, millisecondsToWait);
  }

  function onAddUserChange(e) {
    console.log(`onAddUserChange:${e.target.value}`);
    setAddUser(e.target.value);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card variant="outlined" style={{ padding: "50px" }}>
        <Stack xs={8} md={4} spacing={5}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="使用者名稱"
              onChange={onAddUserChange}
            />
            <Button onClick={onAddUser}>新增</Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">選擇使用者</InputLabel>
              <Select label="選擇使用者" labelId="demo-simple-select-label">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button to={`/`}>進入</Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}

export default User;
