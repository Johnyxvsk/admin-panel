import React from 'react'
import "./list.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

//import {userColumns} from '../../utils/gridColumns/gridColumns'


const List = () => {
  // const [users, setUsers] = useState([])


  // const getUsers = async () => {
  //   try {
  //     let res = await axios.get('/users')
  //     localStorage.setItem('users', JSON.stringify(res.data))
  //     const data = localStorage.getItem('users')
  //     if(data){
  //       setUsers(JSON.parse(data))
  //       console.log('Users set to Storage')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // useEffect(() => {
  //   const data = localStorage.getItem('users');
  //   if(data){
  //       setUsers(JSON.parse(data))
  //     }else{
  //       getUsers()
  //     }
  // }, []);



  return (
    <div className='list'>
      <Sidebar/>
      <div className="listCont">
        <Navbar/>        
        
      </div>
    </div>
  )
}

export default List;