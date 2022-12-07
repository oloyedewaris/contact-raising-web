import { useEffect, useState } from "react"
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'

const Home = () => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)
    axios.get('https://contact-raising-server.onrender.com/api/user/fetch')
      .then(res => {
        setData(res.data.users)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        alert('Cannot get users')
      })
  }

  return (
    <div>
      <div className='header'>
        <div className="all-users">All Users</div>
        <button onClick={getUsers}>Refresh</button>
      </div>
      {loading ? (
        <div style={{ width: '100vw', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
          <ClipLoader />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr className='header-row'>
              <th className="table-header">S/N</th>
              <th className="table-header">Full Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Date Registered</th>
              <th className="table-header">Last Recorded Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => (
              <tr key={i} className='data-row' onClick={() => history.push(`/details/${data._id}`)}>
                <td className="data-cell">{i + 1}</td>
                <td className="data-cell">{data.name}</td>
                <td className="data-cell">{data.email}</td>
                <td className="data-cell">{data.registeredAt}</td>
                <td className="data-cell">
                  {data.locationData[data.locationData.length - 1].address.display_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div >
  )
}

export default Home