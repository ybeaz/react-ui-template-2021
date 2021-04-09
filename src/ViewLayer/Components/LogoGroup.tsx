import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LogoGroup: Function = (): JSX.Element => {
  return (
    <Link
      className='LogoGroup'
      to={{
        pathname: `/home`,
      }}
    >
      <div className='LogoGroup__div'>
        <img
          className='LogoGroup__div_img'
          src='https://ynm.userto.com/filestorage/logoYunazonV13.png'
        />
      </div>
      <div className='LogoGroup__brand'>YouRails</div>
    </Link>
  )
}