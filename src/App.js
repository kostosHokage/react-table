import './App.css';
import React, { useEffect, useState } from 'react';

const initialValues = {
  userName: '',
  userSurname: '',
  userPhone: '',
  userEmail: ''
}



function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  })


  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index))
  }

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index
    })
  }


  // Заполненость полей
  const isFieldFields = userData.userName && userData.userSurname && userData.userPhone && userData.userEmail;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    // Проверка на заполненость полей
    if (isFieldFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData)

        setUsers(editedData);
        setEditableUserData({
          isEdit: false,
          userIndex: null
        })

      } else {
        setUsers((prevState) => [...prevState, userData])
      }


      setUserData(initialValues)
    }
  }



  const handleCleanClick = () => setUserData(initialValues);

  async function getResponse() {
    let serverResponse = await fetch('http://178.128.196.163:3000/api/records')
    let content = await serverResponse.json()
    
    const items = content.map((item) => {
      return {
        userName: item.data.name,
        userSurname: item.data.lastName,
        userPhone: item.data.number,
        userEmail: item.data.email 
      }
    })

    setUsers(items)
  }

  useEffect(() => {
    getResponse();
  }, [])

  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className='table-data'>
          <table>
           <thead>
           <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>User Surname</th>
            <th>User Phone</th>
            <th>User Email</th>
            <th>Actions</th>
            </tr>
           </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userSurname}</td>
                  <td>{user.userPhone}</td>
                  <td>{user.userEmail}</td>
                  <td>
                    <div>
                      <button className='edit-action' onClick={() => handleEditClick(user, index)}>Edit</button>
                      <button className='remove-action' onClick={() => handleRemoveClick(index)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmitUser}>
          <input placeholder='Write your name'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userName: e.target.value
            }))}
            // Удаление данных из инпутов после сабмита
            value={userData.userName}
          />

          <input placeholder='Write your surname'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSurname: e.target.value
            }))}
            // Удаление данных из инпутов после сабмита
            value={userData.userSurname}
          />

          <input type="number" placeholder='Write your phone'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userPhone: e.target.value
            }))}
            // Удаление данных из инпутов после сабмита
            value={userData.userPhone}
          />

          <input type="email" placeholder='Write your Email'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userEmail: e.target.value
            }))}
            // Удаление данных из инпутов после сабмита
            value={userData.userEmail}
          />

          <div className='buttons-wrapper'>
            <button onClick={handleCleanClick} type='reset'>Clean</button>
            <button disabled={!isFieldFields} type='submit'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}




export default App;
