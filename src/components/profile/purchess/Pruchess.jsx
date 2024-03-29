'use client'
import React, { use } from 'react'
import style from './Style.module.css'
import Navbar from '@/components/Navigations/Navbar'
import NestedMenu from '@/components/Navigations/NestedMenu'
import Link from 'next/link'
import { UseAuth } from '@/app/context/AuthContext'
function Pruchess() {
    const {user}=UseAuth()
    if(!user){
        return null
    }
  return (
    <div>
          <Navbar />
      <div
        style={{
          margin: "4rem 0px",
          borderBottom: "1px solid black",
          width: "100%",
        }}
      >
        <NestedMenu />
      </div>
    <div className={style.profileEditWrappper}>
    <ul className={style.profileLink}>
          <li>
            <Link
              href="/profile/message"
              
            >
              MESSAGEAS
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "underline" }}href="/profile/purchases"> PURCHASES</Link>
          </li>

          <li>
            <Link href="" style={{fontWeight:"blod"}}> MY ACCOUNT</Link>
          </li>
          <li>
            <Link href="/profile/edit"> PROFILE</Link>
          </li>
          <li>
            <Link href={`/profile/address/${user.uid}`}>ADDRESS </Link>
          </li>
          <li>
            <Link href="">NOTIFICATIONS </Link>
          </li>
          <li>
            <Link href="">DEVICES </Link>
          </li>
          <li>
            <Link href="/about/contact">HELP</Link>
          </li>
        </ul>
        <div className={style.contener}>
          <h1>Purchases</h1>
          <h2>You have no purchases.</h2>
          <span></span>
        </div>
    </div>
    </div>
  )
}

export default Pruchess
