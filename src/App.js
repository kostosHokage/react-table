import './App.css';
import React, { useState } from 'react';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''
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
  const isFieldFields = userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    // Проверка на заполненость полей
    if (isFieldFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData)
      }

      setUsers((prevState) => [...prevState, userData]);
      setUserData(initialValues)
    }
  }

  const handleCleanClick = () => setUserData(initialValues);

  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className='table-data'>
          <table>
            <th>ID</th>
            <th>User Name</th>
            <th>User Surname</th>
            <th>User Salary</th>
            <th>Actions</th>
            <tbody>
              {users.map((userData, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{userData.userName}</td>
                      <td>{userData.userSurname}</td>
                      <td>{userData.userSalary}</td>
                      <td>
                        <div>
                          <button className='edit-action' onClick={() => handleEditClick(userData, index)}>Edit</button>
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

          <input type="number" placeholder='Write your salary'
            onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSalary: e.target.value
            }))} 
            // Удаление данных из инпутов после сабмита
            value={userData.userSalary}
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
