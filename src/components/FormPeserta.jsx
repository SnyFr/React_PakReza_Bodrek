import { useState, useEffect } from "react";

const FormPeserta = ({onSimpan, onCancel, pesertaEdit}) => {

  const [nama, setNama] = useState ("");
  const [jurusan, setJurusan] = useState ("");
  const [error, setError] = useState ("");

  //useEffect : hasil request dari server  menghasilkan sebuah data,dirender cuma satu kali, tidak ada perubahan
  //useEffect(() => {
    // user
    // },[user]) [] = dependencies
    
    useEffect(()=>{
      if(pesertaEdit) {
        // edit
        setNama(pesertaEdit.nama);
        setJurusan(pesertaEdit.jurusan);
      }else {
        // tambah
        setNama("");
        setJurusan("");
      }
    }, [pesertaEdit])

  const handleSimpan = (e) => {
    e.preventDefault();
    if(!nama.trim() || !jurusan.trim()) {
      setError("MOHON ISI!!")
      return;
    }
    onSimpan({
      id: pesertaEdit ? pesertaEdit.id : Date.now(),
      nama,
      jurusan,
    });
    setNama("");
    setJurusan("");
  }

  return (
    <form onSubmit={handleSimpan} method="post" style={{
        background: "#8B9A6E",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontFamily: "Segoe UI",
      }}>
        <h3>Tambah Peserta: {nama} </h3>
        <div style={{ 
          display:"flex",
          gap: "8px",
          flexWrap: "wrap",
         }}>
          <input type="text" placeholder="Nama Peserta" value = {nama} onChange={(e) => setNama(e.target.value)} style={{ 
            padding: "8px" 
            }}/>
          <input type="text" placeholder="Jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} style={{ 
            padding: "8px" 
            }}/>
          <button type="submit" style={{ 
            background: "#578EF5",
            color : "white",
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            padding: "8px 16px",
           }}>
            {pesertaEdit ? 'Edit' : 'Simpan'}
          </button>
         </div>
      </form>
  )
}

export default FormPeserta;