import React from 'react'

export default function ProfileButton() {
  const handleClick = () => {
    console.log(localStorage.getItem('token'))
  }
  return (
    <a onClick={handleClick}>
      Profile
    </a>
  )
}
