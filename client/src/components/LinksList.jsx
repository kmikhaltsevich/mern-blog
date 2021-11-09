import React from 'react'
import { Link } from 'react-router-dom'

const LinksList = ({ links }) => {
  if (!links?.length) {
    return (
      <h2>Links is not found</h2>
    )
  }

  const checkLinkLength = link => {
    return link.length > 30 ? `${link.substr(0, 30)}...` : link
  }

  return (
    <>
      <h2>Links</h2><table>
      <thead>
      <tr>
        <th>№</th>
        <th>Abbreviated</th>
        <th>Original</th>
        <th>more details</th>
      </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index+1}</td>
            <td><a href={link.from} target="_blank" rel="noreferrer noopener">{link.from}</a></td>
            <td><a href={link.to} target="_blank" rel="noreferrer noopener" title={link.to}>{checkLinkLength(link.to)}</a></td>
            <td>
              <Link to={`/detail/${link._id}`}>More</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </>
  )
}

export default LinksList
