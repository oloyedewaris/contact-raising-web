import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en)

const Details = () => {
  const timeAgo = new TimeAgo('en-US')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const userId = useParams().userId;

  useEffect(() => {
    setLoading(true)
    axios.get(`https://contact-raising-server.onrender.com/api/user/fetch/${userId}`)
      .then(res => {
        setUser(res.data.user)
        console.log(res.data.user)
        setLoading(false)
      })
      .catch(err => {
        alert('Cannot get user info')
        setLoading(false)
      })
  }, [userId])

  return (
    <div>
      {loading ? (
        <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ClipLoader />
        </div>
      ) : (
        <>
          {user ? (
            <>
              <div>
                <h2 style={{ textAlign: 'center' }}>Details and Location History</h2>
                <div className='first-row'>
                  <div className='desc-block'>
                    <div><span className='profile-description'>Name: </span>{user.name}</div>
                    <div><span className='profile-description'>Email: </span>{user.email}</div>
                    <div><span className='profile-description'>Date Registered: </span>{user.registeredAt}</div>
                    <div>
                      <span className='profile-description'>Last Visited Area: </span>
                      {user.locationData[0].address.display_name}
                    </div>
                  </div>
                  <div className='desc-block'>
                    <img alt='user' className='user-img' src={user.image} />
                  </div>
                </div>
              </div>
              <div className='loc-history'>Location History</div>
              <table className="table">
                <thead>
                  <tr className='header-row'>
                    <th className="table-header">Time</th>
                    <th className="table-header">Longitude</th>
                    <th className="table-header">Latitude</th>
                    <th className="table-header">Address</th>
                    <th className="table-header">Country</th>
                    <th className="table-header">State</th>
                    <th className="table-header">City</th>
                    <th className="table-header">Report Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {user.locationData.map((data, i) => (
                    <tr className='data-row' key={i}>
                      {data?.time && <td className="data-cell">{timeAgo.format(data?.time, 'round') || 'Not available'}</td>}
                      <td className="data-cell">{data?.location?.longitude || 'Not available'}</td>
                      <td className="data-cell">{data?.location?.latitude || 'Not available'}</td>
                      <td className="data-cell">{data?.address?.display_name || 'Not available'}</td>
                      <td className="data-cell">{data?.address?.address.country || 'Not available'}</td>
                      <td className="data-cell">{data?.address?.address.state || 'Not available'}</td>
                      <td className="data-cell">{data?.address?.address.city || 'Not available'}</td>
                      <td className="data-cell">{data?.location?.accuracy || 'Not available'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <h2>User not  found</h2>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Details