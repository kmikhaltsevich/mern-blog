import React from 'react'

const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>Abbreviated: <a href={link.from} target="_blank" rel="noreferrer noopener">{link.from}</a></p>
      <p>Original: <a href={link.to} target="_blank" rel="noreferrer noopener">{link.to}</a></p>
      <p>Clicks count: <strong>{link.clicks}</strong></p>
      <p>Date of created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}

export default LinkCard
