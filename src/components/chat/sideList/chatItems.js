import { authActions, authSelector } from '@/redux/slices/authSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaImage } from "react-icons/fa6";
import SpinnerCustom from '@/components/spinner';
const ChatItems = ({ contact, isChatted }) => {
  const dispatch = useDispatch();
  const date = new Date(contact.createAt);
  const nowDate=new Date();
  const user = useSelector(authSelector);
  const getIt=()=>{
    if(nowDate.getDate()==date.getDate() && nowDate.getMonth==date.getMonth && nowDate.getFullYear==date.getFullYear){
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    else{
      return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
    
  }
  return (
    
      user.searchContact && !contact.name.toLowerCase().includes(user.searchContact.toLowerCase()) ? '' :
        <div className='p-4 py-2 my-2 flex gap-3 items-center cursor-pointer hover:bg-input-bg rounded-lg w-full' onClick={() => {
          dispatch(authActions.setcurrent_chat(contact));
          dispatch(authActions.showContact(false))
        }}>
          
          <div className='h-12 rounded-full w-12 overflow-hidden'>
            
            <img src={contact.image} className='h-full w-full'></img>
          </div>
          <div className='w-1/2'>
            <div className='w-full h-5 '>

              <h1 className='text-blue-btn overflow-hidden text-ellipsis w-full h-full'>{contact.name}</h1>
            </div>

            {isChatted && contact.type == "image" && <div>
              {contact.senderId == user.id ? <div className='flex items-center gap-2 text-[11px] tracking-wider'><p>You: </p><span><FaImage /></span></div>
                :
                <div className='flex items-center gap-2 text-[11px] tracking-wider'><span><FaImage /></span></div>}
            </div>
            }
            {isChatted && contact.type != 'image' && <p className='text-[11px] tracking-wider h-4 w-full overflow-hidden text-ellipsis'>{contact.id == user.id ? `You: ${contact.message}` : contact.message}</p>}
            {/* {isChatted && contact.type != 'image' && <p className='text-[11px] tracking-wider h-3 w-full overflow-hidden text-ellipsis '>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>} */}

            {!isChatted && <p className='text-[11px] tracking-wider h-3 w-full break-words'>{contact.email}</p>}


          </div>
          <div className='justify-end flex-grow text-end flex flex-end gap-2'>
            {/* {isChatted && contact.totalUnreadMessages > 0 ? <div className='p-2 rounded-full bg-input-bg h-6 w-6 flex justify-center items-center text-xs'>{contact.totalUnreadMessages}</div> : ''} */}
            {isChatted && <p className='text-xs'>{getIt()}</p>}


          </div>
        </div>
  )
}

export default ChatItems