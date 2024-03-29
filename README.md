## Instalando o firebase
````
npm install firebase
````
## Iniciando com variaveis de ambiente
````
 Crie um arquivo chamado - ".env.local"
 Caso use VS'code pode baixar o plugin dotEnv
````

###  Editar regras na tela do fire base

![image](https://github.com/FranciscoWallison/nextjs_firebase_api_simples/assets/19413241/c49326a0-6e51-4e6a-aa3c-3d204cfa9c94)


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



## Iniciando variáveis de ambiente

Adiciona um arquivo na raiz do projeto chamado: `.env.local`,
com as seguintes informações:

````
NEXT_PUBLIC_FIREBASE_API_KEY=<sua_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<seu_auth_domain>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<sua_url_do_database>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<seu_id_do_projeto>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<seu_bucket_de_armazenamento>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<seu_id_do_sender>
NEXT_PUBLIC_FIREBASE_APP_ID=<seu_app_id>
````

##  ['service/firebase.js'](https://github.com/FranciscoWallison/nextjs_firebase_api_simples/blob/main/service/conecte_firebase.js) Arquivo com as configurações do projeto
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
