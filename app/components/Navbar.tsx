'use client'

import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 transition-colors';
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <div className="logo"><Link href={"/"}><AiFillBug/></Link></div>
        <ul className='flex space-x-6'>
            <li><Link className={`${isActive('/')}`} href={"/"}>Dashboard</Link></li>
            <li><Link className={`${isActive("/issues")}`} href={"/issues"}>Issues</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar