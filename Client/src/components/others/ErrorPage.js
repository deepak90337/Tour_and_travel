import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <>
      <p>Page not available</p>
      <NavLink to=
      '/'>back to home page</NavLink>
    </>
  )
}
