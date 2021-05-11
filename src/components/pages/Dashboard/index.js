import React, { useState, useEffect } from 'react'
import firebase from '../../../config/Firebase'

const Dashboard = () => {
    const [acara, setAcara] = useState("")
    const [lokasi, setLokasi] = useState("")
    
    const [keterangan,setKeterangan] = useState("")
    
    const [kegiatan,setKegiatan] = useState([])

    const [button, setButton] = useState("Save")
    const [selectedKegiatan, setSelectedKegiatan] = useState({})
   
    var [date, setDate]= useState(new Date())
    var tanggal = date.toString();
    useEffect(() => {
      firebase.database().ref('kegiatann').on("value", (res) => {
        if(res.val()) {
            //ubah menjadi array
           const rawData = res.val();
            const kegiatanArr =[];
            Object.keys(rawData).map((item) => {
              kegiatanArr.push({
                  id: item,
                  ...rawData[item],
              });
            });
            setKegiatan(kegiatanArr); 
            
          }
      });
    }, []);

    const resetForm =() => {
        setAcara("");
        setLokasi("");
        setDate("")
        setKeterangan("");
        setButton('Save')
        setSelectedKegiatan({})
    };

    const onSubmit =() =>{
    
        const data ={
            acara: acara,
            tanggal:tanggal,
            lokasi: lokasi,
            keterangan: keterangan,
        };
        if(button === 'Save'){
            //Insert
         firebase.database().ref('kegiatann').push(data);
        }else{
            //Update
            firebase.database().ref(`kegiatann/${selectedKegiatan.id}`).set(data)
        }
        resetForm();
    }
    
    const onUpdateData =(item) => {
        setAcara(item.acara)
        setLokasi(item.lokasi)
        setDate(item.tanggal)
        setKeterangan(item.keterangan)
        setButton("Update")
        setSelectedKegiatan(item)
    }

    const onDeleteData = (item) => {
      //delete
      firebase.database().ref(`kegiatann/${item.id}`).remove()
    }
     
    return (
        <div className="container mt-5">
            <h3 className="titletext">Tambahkan Rencana</h3>
            <h3 className="titletext">Kegiatan Anda</h3>
            <div className="col-6">
            <p>Nama Kegiatan</p>
            <input className="form-control" placeholder="Type the program name" value={acara} onChange={(e) =>setAcara(e.target.value)} />
            
            <p>Tanggal</p>
            <input className="form-control" type="date" format="y-MM-dd" value={date} onChange={(e) =>setDate(e.target.value)}/>
            <p>Lokasi</p>
            
            <input className="form-control" placeholder="Type the location" value={lokasi} onChange={(e) =>setLokasi(e.target.value)} />
            <p>Keterangan</p>
            <input className="form-control" placeholder="Type description" value={keterangan} onChange={(e) =>setKeterangan(e.target.value)} />
            
            <br />
  
            <button className="btn btn-primary" onClick={onSubmit}>{button}</button>
            
            {
                button === "Update" && (
                    <button className="btn btn-secondary" onClick={resetForm}>Cancel Update</button>
                )
            }
            </div>
            <hr />
            <h3 className="daftar">Daftar Kegiatan</h3>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>Nama Kegiatan</th>
                        <th>Tanggal</th>
                        <th>Lokasi</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {kegiatan.map((item) => (
                        <tr key={item.id}>
                            <td>{item.acara}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.lokasi}</td>
                            <td>{item.keterangan}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => onUpdateData(item)}>Update</button>
                                <button className="btn btn-danger" onClick={() => onDeleteData(item)}>Done</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
           </div>
    )
}

export default Dashboard;