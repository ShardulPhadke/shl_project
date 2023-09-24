"use client"

import React from 'react'
import Link from "next/link";
import { useSession } from 'next-auth/react'

const Home = () => {

  const { data: session} = useSession();

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            <br className="max-md:hidden "/>
            <span className="orange_gradient text-center">
                Discover new project ideas!
            </span>
        </h1>
        <br/>
        <br/>
        <p className="w-full text-center">
            Seek inspiration from a variety of projects.<br/>We have a selection of projects with various tech stacks to find the perfect match for you! 
        </p>
        <br/>
        {session?.user ? (
          <div>
            <Link href="/projects" className="black_btn flex-center">View Projects</Link>      
          </div>
        ) : (
          <>
          </>
        )}
    </section>
  )
}

export default Home