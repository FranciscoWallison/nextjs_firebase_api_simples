import { app, database  } from '../../service/conecte_firebase';
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


export default async function handler(req, res) {
  
  // GET - MOSTRAR TODOS
  if (req.method === "GET") {

    const id = req.query.id
   
    if (id === undefined) {
      // TODOS DO FIRE BASE 
      const allUser = await getDocs(dbInstance)
      .then((data) => {
          return data.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })   
      })

      res.status(200).json(allUser)
    }else{

      // UNIDADE  DO FIRE BASE 

      const singleUsuario = doc(database, 'usuarios', id)
      const data = await getDoc(singleUsuario)

      const user = {...data.data(), id: data.id  };
   
      if (user === undefined) {
        res.status(404).json(user)
      }else{
        res.status(200).json(user)
      }
      
    }

  }
  // POST - Inserir
  else if (req.method === "POST" ){
    const {nome, email , idade } = req.body;

    addDoc(dbInstance, {nome, email , idade })
    .then(() => {
      console.log("adicionado: ", {nome, email , idade })
    })

    res.status(200).json("Inserido com sucesso")
  } 
  // DELETE - Inserir
  else if (req.method === "DELETE" ){
    const collectionById = doc(database, 'usuarios', req.body.id)

    deleteDoc(collectionById)
      .then(() => {
        console.log("delete: ", req.body.id )
      })
    res.status(204).json()
  } 
  else if (req.method === "PUT" ){
    const id = req.query.id;
    if (id === undefined) {
      res.status(404).json()
    }else{
      const singleUsuario = doc(database, 'usuarios', id)
      const data = await getDoc(singleUsuario)

      const user = {...data.data(), id: data.id  };

      if (user === undefined) {
        res.status(404).json(user)
      }else{
        const {nome, email , idade } = req.body;

        const collectionById = doc(database, 'usuarios', id)

        await updateDoc(collectionById, {
          nome,
          email,
          idade
        })
        .then(() => {
          console.log("update: ", nome,
          email,
          idade,
          id
          )
        })


        res.status(200).json()
      }
    }
  }
  else {
    res.status(404).json("Pagina não encontrada")
  }
}
