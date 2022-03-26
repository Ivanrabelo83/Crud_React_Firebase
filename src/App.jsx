import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import { collection, getFirestore, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'
import { useEffect, useState } from 'react';




const firebaseApp = initializeApp( {
  apiKey: "AIzaSyC_chAMVhukSOECQ4hVqSdsHG8KPC18rDk",
  authDomain: "reactfirebase-db564.firebaseapp.com",
  projectId: "reactfirebase-db564",
  
});

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);


  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, "users");


  async function criarUser(){
    const user = await addDoc(userCollectionRef, {
      name, email,
    });



  }






  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    };
      getUsers();
    },[]);

async function deleteUser(id) {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
}







  return (
      <div>
        <input type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={ criarUser }>Criar usuário</button>


        <ul>
          {users.map((user) => {
            return (
              <div key={user.id}>
                  <li>{user.name}</li>
                  <li>{user.email}</li>
                  <button onClick={ () => deleteUser(user.id)}>Deletar Usuário</button>
              </div>
            )
          })}
        </ul>

      </div>
  );
}

export default App;
