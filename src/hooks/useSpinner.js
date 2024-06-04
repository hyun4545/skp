
import React, { useState } from 'react'
import { Backdrop,CircularProgress } from '@mui/material'

const createPromise = () => {
    let resolver;
    return [ new Promise(( resolve, reject ) => {

        resolver = resolve
    }), resolver]
}

const useSpinner = () => {
  const [ open, setOpen ] = useState(false);
  const [ resolver, setResolver ] = useState()
  const [ label, setLabel ] = useState()
  
  const getSpinner = async (text) => {
        setLabel(text);
        setOpen(true);
        const [ promise, resolve ] = await createPromise()
        setResolver({ resolve })
        return promise;
  }

  const onClick = async() => {
        setOpen(false);
        resolver.resolve()
  }

  const Spinner = () => (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    onClick={onClick}
  >
    <label>{label}</label>
    <CircularProgress color="inherit" />
  </Backdrop>
  )

    return [ getSpinner, Spinner ]
    
}

export default useSpinner;