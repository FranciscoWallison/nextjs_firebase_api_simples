// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openDb from '../../database/setupDatabase'
export default async function handler(req, res) {
  
  const db = await openDb();

  // GET - MOSTRAR TODOS
  if (req.method === "GET") {

    const id = req.query.id
   
    if (id === undefined) {
      const allUser = await db.all("SELECT * FROM users");
      res.status(200).json(allUser)
    }else{
      const user = await db.get("SELECT * FROM users where id = ?", [id])
   
      if (user === undefined) {
        res.status(404).json(user)
      }else{
        res.status(200).json(user)
      }
      
    }

  }
  // POST - Inserir
  else if (req.method === "POST" ){
    
    const createUser = await db.prepare("INSERT INTO users (nome, email, idade) VALUES ( ?, ?, ?)")

    const runCreate = await createUser
       .run(req.body.nome, req.body.email , req.body.idade );

    res.status(200).json("Inserido com sucesso")
  } 
  // DELETE - Inserir
  else if (req.method === "DELETE" ){
    const runDelete = await db
      .prepare("DELETE FROM users WHERE id = ?")
    const deleteUser = await runDelete
       .run(req.body.id );
    res.status(204).json()
  } 
  else if (req.method === "PUT" ){
    const id = req.query.id;
    if (id === undefined) {
      res.status(404).json()
    }else{
      const user = await db.get("SELECT * FROM users where id = ?", [id])
      if (user === undefined) {
        res.status(404).json(user)
      }else{
        const updateUser = await db.prepare("UPDATE users SET nome = ?, email = ?, idade =?  WHERE id = ?")
        const {nome, email , idade } = req.body;

        const runCreate = await updateUser        
        .run(nome, email, idade, id );

        res.status(200).json()
      }
    }
  }
  else {
    res.status(404).json("Pagina não encontrada")
  }
}
