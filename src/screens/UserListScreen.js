import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../redux/actions/userActions'

import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

function UserListScreen({ history }) {
  const dispatch = useDispatch()

  const { loading, error, users } = useSelector(({ userList }) => userList)
  const { userInfo } = useSelector(({ userLogin }) => userLogin)
  const { success: successDelete } = useSelector(({ userDelete }) => userDelete)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) history.push('/login')
    dispatch(listUsers())
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) dispatch(deleteUser(id))
  }
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={'mailto:' + user.email}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' size='sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button variant='danger' size='sm' onClick={() => deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
