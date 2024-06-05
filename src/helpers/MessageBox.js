import React, { Fragment, useState,createContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";

export const createPromise = () => {
  let resolver;
  return [
    new Promise((resolve, reject) => {
      resolver = resolve;
    }),
    resolver,
  ];
};

export const useSpinner = () => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState();

  const ShowSpinner = (text) => {
    setLabel(text);
    setOpen(true);
  };

  const HideSpinner = () => {
    setOpen(false);
  };

  const Spinner = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={HideSpinner}
      >
        <label>{label}</label>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  return [ShowSpinner, HideSpinner, Spinner];
};

export const useMessageBox = () => {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState();
  const [label, setLabel] = useState();

  const ShowMessageBox = async (text) => {
    setLabel(text);
    setOpen(true);
    const [promise, resolve] = await createPromise();
    setResolver({ resolve });
    return promise;
  };

  const onClick = async (status) => {
    setOpen(false);
    resolver.resolve(status);
  };

  const MessageBox = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{label}</DialogContent>
        <DialogActions>
          <Button onClick={() => onClick()}> 關閉 </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return [ShowMessageBox, MessageBox];
};

export const useConfirm = () => {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState();
  const [label, setLabel] = useState();

  const ShowConfirm = async (text) => {
    setLabel(text);
    setOpen(true);
    const [promise, resolve] = await createPromise();
    setResolver({ resolve });
    return promise;
  };

  const onClick = async (status) => {
    setOpen(false);
    resolver.resolve(status);
  };

  const Confirm = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{label}</DialogContent>
        <DialogActions>
          <Button onClick={() => onClick(false)}> Cancel </Button>
          <Button onClick={() => onClick(true)}> OK </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return [ShowConfirm, Confirm];
};

export const MessageBoxContext = createContext({
  ShowMessageBox: (msg) => {},
  ShowSpinner: () => {},
  HideSpinner: () => {},
  ShowConfirm: (msg) => {},
});

export const MessageBoxProvider = ({ children }) => {
  const [ShowMessageBox, MessageBox] = useMessageBox();
  const [ShowSpinner, HideSpinner, Spinner] = useSpinner();
  const [ShowConfirm, Confirm] = useConfirm();

  const context = {
    ShowMessageBox,
    ShowSpinner,
    HideSpinner,
    ShowConfirm,
  };

  return (
    <MessageBoxContext.Provider value={context}>
      <Fragment>
        {children}
        <MessageBox />
        <Spinner />
        <Confirm />
      </Fragment>
    </MessageBoxContext.Provider>
  );
};
