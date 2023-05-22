import { useState } from 'react';
import { app, database  } from '../service/conecte_firebase';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
    addDoc
} from 'firebase/firestore'
const dbInstance = collection(database, 'usuarios');


export default function Home() {
  const [value, setValue] = useState('');

    const getUsuarios = (e) => {
        e.preventDefault();

        getDocs(dbInstance)
            .then((data) => {
                const array =  data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })   
            })
    }


    const  saveUsuarios = (e) => {
        e.preventDefault();
        

        let users = {
            // "id": 20,
            "nome": "chicoTes2",
            "email": "chicoTes2@gmail",
            "idade": 35
        }

        addDoc(dbInstance, users )
            .then((data) => {
                // setNoteTitle('')
                // setNoteDesc('')
                console.log("saveUsuarios: ", data)
            })
    }


    const getSingleUsuarios = async  (e) => {
        e.preventDefault();
   
        const singleUsuario = doc(database, 'usuarios', "hSOsmcaLpyXIA8kVvh4i")
        const data = await getDoc(singleUsuario)
        console.log("getSingleUsuarios: ", {...data.data(), id: data.id  })
        // setSingleNote({ ...data.data(), id: data.id })
    }


    const editUsuarios = (id, objectUser) => {
        const collectionById = doc(database, 'usuarios', id)

        let users = {
            // "id": 20,
            "nome": "chicoTes2",
            "email": "chicoTes2@gmail",
            "idade": 35
        }

        updateDoc(collectionById, users)
            .then(() => {
            //    atualização 
            })
    }

  return (
    <div>
      <h1>Valor atual: {value}</h1>
      <form onSubmit={getUsuarios}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Atualizar valor</button>
      </form>
    </div>
  );
}