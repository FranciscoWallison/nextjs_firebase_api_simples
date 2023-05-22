## iniciando firebase
````
npm install firebase
````
## Iniciando com variaveis de ambiente
````
 Crie um arquivo chamado - ".env.local"
 Caso use VS'code pode baixar o plugin dotEnv
````


###  Editar regras

````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

````



## iniciando variavei de ambiente
````
NEXT_PUBLIC_FIREBASE_API_KEY=<sua_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<seu_auth_domain>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<sua_url_do_database>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<seu_id_do_projeto>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<seu_bucket_de_armazenamento>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<seu_id_do_sender>
NEXT_PUBLIC_FIREBASE_APP_ID=<seu_app_id>
````

##  'firebase.js' Arquivo com as configurações do projeto
````
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const  firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
````

## Chamando o projeto para usar o banco não relacional 
````
import { useState } from 'react';
import firebase from '../lib/firebase';

export default function Home() {
  const [value, setValue] = useState('');

  // Lê o valor da chave 'message' no banco de dados
  const getValue = async () => {
    const snapshot = await firebase.database().ref('message').once('value');
    setValue(snapshot.val());
  };

  // Atualiza o valor da chave 'message' no banco de dados
  const updateValue = async (e) => {
    e.preventDefault();
    await firebase.database().ref('message').set(value);
  };

  return (
    <div>
      <h1>Valor atual: {value}</h1>
      <button onClick={getValue}>Obter valor</button>
      <form onSubmit={updateValue}>
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
````
