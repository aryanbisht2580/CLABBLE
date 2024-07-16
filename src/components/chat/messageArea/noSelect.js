import React from 'react'

const Noselect = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4 '>
        <img src="/startChat.svg" className='h-1/3 w-auto'></img>
        <h1 className='text-2xl font-semibold'>It's nice to chat with someone</h1>
        <h3 className='mb-20 font-extralight tracking-wider '>Pick up a person from the left menu and start your conversation</h3>
    </div>
  )
}

export default Noselect