"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Typography, Modal, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from "firebase/firestore";
export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const udpateInventory = async () => {
    const querySnapshot = query(collection(firestore, "Shelfs"));
    const docs = await getDocs(querySnapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList)
  };


  const removeItem = async (item) => { 
    const docRef = doc(collection(firestore, 'Shelfs'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await udpateInventory()
  }

  const addItem = async (item) => { 
    const docRef = doc(collection(firestore, 'Shelfs'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity + 1})
    }
  else{
    await setDoc(docRef, {quantity: 1})
  }
    await udpateInventory()
  }

  useEffect(() => {
    udpateInventory();
  }, []);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{ transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              ADD
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Items
      </Button>
      <Box border="1px solid #333" width="800px">
        <Box width="100%" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h2" color="333">Shelf Items</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><Typography variant="h6">Name</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Quantity</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map(({ id, name, quantity }) => (
                <TableRow key={id}>
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="center">{quantity}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => addItem(name)}>Add</Button>
                    <Button onClick={() => deleteItem(id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
