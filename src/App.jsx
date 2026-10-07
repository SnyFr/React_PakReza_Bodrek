// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
// import DataPeserta from './components/DataPeserta';
// import { Peserta } from './components/Peserta';
// import FormPeserta from './components/FormPeserta';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
// import AppNavbar from './components/NavBar';
import MainLayout from './pages/MainLayout';
import ListUser from './pages/user/list';
import CategoryPage from './pages/category page/category';
import ProductsPage from './pages/product page/product';


function App() {
  // Destruct
  // const siswa ={
  //   nama: "Burok",
  //   nilai: 80,
  // }
  // const {nama, nilai} = siswa;
  // console.log(nama);
  // console.log(nilai);


  //useState : gerubah data jadi dinamis dengan aksi(Event: onClick, onChange, keyUp, keyDown)
  //count adalah getter. setCount adalah setter =>function tapi dipanggil lewat const
  //untuk merubah data dengan aksi, klik

  // const [count, setCount] = useState(0);

  // //1. function component(masih dipakai), class component(sdh dtinggalin)

  // function Peserta({nama, kelas, nilai}) {
  //   return (
  //     <div style={{border: "1px solid #ccc", padding: "13px", margin:"8px", borderRadius: "8px"}}>
  //       <h3>{nama}</h3>
  //       <p>{kelas}</p>
  //       <p>{nilai}</p>
  //     </div>
  //   )
  // }

  // //props : property
  // //membuat komponen jadi lebih dinamis 

  // return (
  //   <>
  //     <Peserta nama= "Budi" kelas = "Web Programming" nilai = "80" />
  //     <Peserta nama= "Andi" kelas = "Tekom" nilai = "100" />
  //     <Peserta nama= "Lala" kelas = "Tkj" nilai = "90" />

  //     <p>Total data : {count}</p>
  //     <button onClick={() => setCount(count + 1)}>Tambah</button>
  //     <button onClick={() => setCount(count - 1)}>Kurang</button>
  //   </>
  // )
//   const [listPeserta, setListPeserta] = useState(Peserta);
//   const [editPeserta, setEditPeserta] = useState(null);

//   const handleSubmit = (DataPeserta) => {
//     if(editPeserta) {
//       setListPeserta(
//         listPeserta.map((item) => (item.id === DataPeserta.id ? DataPeserta : item)));
//       setEditPeserta(null);
//     }else{
//       setListPeserta([...listPeserta, DataPeserta])
//     }
//   }

//   const handleHapus = (id) => {
//     setListPeserta(listPeserta.filter((item) => item.id !== id));
//     if (id === editPeserta.id) {
//       setListPeserta(null);
//     }
//   }
//   return (
//    <>
//     <FormPeserta onSimpan={handleSubmit} pesertaEdit={editPeserta}/>
//     {/* {map looping juga} */}
//     {listPeserta.map((item) => (
//         <DataPeserta key={item.id} peserta={item} onEdit={setEditPeserta} onHapus={handleHapus} />
//       ))
//     }
    
//    </> 
//   )


return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<MainLayout/>}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/user" element={<ListUser />}></Route>
        <Route path="/categories" element={<CategoryPage />}></Route>
        <Route path="/product" element={<ProductsPage />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

}

export default App;
