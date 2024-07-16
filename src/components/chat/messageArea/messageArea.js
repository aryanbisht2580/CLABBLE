import React from 'react'
import MessageAreaHeader from './messageAreaHeader'
import MessageAreaMain from './messageAreaMain'
import MessageAreaFooter from './messageAreaFooter'

const MessageArea = () => {
  return (
    <div className='p-2 px-5  flex flex-col h-full'>
      <MessageAreaHeader/>
      <MessageAreaMain/>
      <MessageAreaFooter/>
    </div>
  )
}

export default MessageArea