import { Dropdown } from 'flowbite-react'
import Image from 'next/image'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  FaAngleDown,
  FaAnglesLeft,
  FaAt,
  FaB,
  FaCode,
  FaFaceSmileBeam,
  FaItalic,
  FaPaperPlane,
  FaPencil,
  FaPlus,
  FaRegFaceSmile
} from 'react-icons/fa6'
import Message from './Message'
import { IoPersonAdd } from 'react-icons/io5'
import { AiOutlineBars, AiOutlineCode, AiOutlineLink, AiOutlineOrderedList, AiOutlineUnderline } from 'react-icons/ai'
import { RiAddLine } from 'react-icons/ri'
import { BiMicrophone, BiVideo } from 'react-icons/bi'
import Thread from './Thread'
import { memo, useEffect, useRef, useState } from 'react'
import { IChannel } from '@/redux/slice/types'
import { AppDispatch, store } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setThreadList } from '@/redux/slice/threadSlice'
import { useGetChannelByIdQuery } from '@/redux/api/chanelAPI'

let arrMessage = [
  {
    id: 1,
    userid: 1,
    content: 'Hello',
    times: '10:00 AM',
    comment: [
      {
        id: 1,
        userid: 2,
        times: '10:01 AM',
        comment: 'xin chào Kuga'
      },
      {
        id: 2,
        userid: 1,
        times: '10:02 AM',
        comment: 'xin chào Phòng Em'
      },
      {
        id: 3,
        userid: 2,
        times: '10:03 AM',
        comment: 'Bạn có khỏe không?'
      }
    ]
  },
  {
    id: 2,
    userid: 2,
    content: 'How are you?',
    times: '10:30 AM',
    comment: [
      {
        id: 1,
        userid: 1,
        times: '10:31 AM',
        comment: "I'm fine"
      }
    ]
  },
  {
    id: 3,
    userid: 1,
    content: 'I am fine',
    times: '10:40 AM',
    comment: []
  },
  {
    id: 4,
    userid: 2,
    content: 'I am fine',
    times: '10:40 AM',
    comment: []
  },
  {
    id: 5,
    userid: 1,
    content: 'I am fine',
    times: '10:40 AM',
    comment: []
  },
  {
    id: 6,
    userid: 2,
    content: 'I am fine',
    times: '10:40 AM',
    comment: []
  }
]

interface IProps {
  channel: IChannel
}
// ---------------------------------------------------------------------------------------------
function Channel({ channel }: IProps) {
  const [showThread, setShowThread] = useState({
    status: false,
    idMessageReplies: 0
  })
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)

  const AddEmoji = (e: any) => {
    const sym = e.unified.split('-')
    const codesArray: any = []
    sym.forEach((el: any) => codesArray.push('0x' + el))
    const emoji = String.fromCodePoint(...codesArray)
    setText(text + emoji) // set text
    setShowEmoji(false) // hide emoji
  }
  let emojiRef = useRef<any>()
  useEffect(() => {
    let handle = (e: any) => {
      if (!emojiRef.current.contains(e.target)) {
        setShowEmoji(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
    }
  })
  const class_hover_iconInputChat = 'cursor-pointer p-1 text-[1rem] rounded hover:bg-zinc-600'
  // ---------------------------------------------------------------------------------------------
  const [rowArea, setRowArea] = useState(1)
  const [heightArea, setHeightArea] = useState({
    body: 'h-75pt w-full relative overflow-hidden',
    input: 'h-25pt relative'
  })
  function handleTextArea(e: any) {
    let lengthTextArea = e.target.value.length
    if (lengthTextArea > 750) {
      setRowArea(8)
      setHeightArea({ body: 'h-3/6 w-full relative overflow-hidden', input: 'h-3/6 relative' })
    } else if (lengthTextArea > 500) {
      setRowArea(4)
      setHeightArea({ body: 'h-4/6 w-full relative overflow-hidden', input: 'h-2/6 relative' })
    } else if (lengthTextArea > 250) {
      setRowArea(2)
      setHeightArea({ body: 'h-4/6 w-full relative overflow-hidden', input: 'h-2/6 relative' })
    } else if (lengthTextArea == 0) {
      setRowArea(1)
      setHeightArea({ body: 'h-75pt w-full relative overflow-hidden', input: 'h-25pt relative' })
    }
  }
  // ---------------------------------------------------------------------------------------------
  function handleShowThread(status: boolean, idMessageReplies: any) {
    setShowThread({ ...showThread, status: status, idMessageReplies: idMessageReplies })
  }
  const [focusInput, setFocusInput] = useState({
    option: ''
  })
  function handleFocusInput(op: string) {
    if (op === focusInput.option) {
      return {
        cls_focus: 'flex items-center rounded p-1 bg-green-400 text-zinc-200',
        cls_hover: 'cursor-pointer ease-linear duration-200 p-1 hover:bg-zinc-500 rounded'
      }
    } else {
      return {
        cls_focus: 'flex items-center rounded p-1 bg-zinc-800 text-zinc-400',
        cls_hover: 'cursor-pointer ease-linear duration-200 p-1'
      }
    }
  }
  const [activeItemSlideBar, setActiveItemSlideBar] = useState('proj-datn')
  const [showCamera, setShowCamera] = useState(false)
  // ---------------------------------------------------------------------------------------------
  return (
    <div className='flex flex-row h-full w-full bg-zinc-900 opacity-90'>
      {/* content */}
      <div className='flex flex-col h-full w-full'>
        {/* header thread */}
        <div className='h-12 flex items-center p-4 border-b-2 border-zinc-700'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2 text-zinc-200 font-semibold'>
              <Dropdown inline label={channel.name}>
                <Dropdown.Item>View profile</Dropdown.Item>
                <Dropdown.Item>Start a conversation</Dropdown.Item>
              </Dropdown>
            </div>
            <div className='flex items-center text-zinc-200 gap-2 hover:bg-slate-600 ease-linear duration-150 p-1 rounded cursor-pointer'>
              <div className='relative inline-flex'>
                <Image className='rounded bg-white' src='/images.png' alt='logo' width={30} height={30} />
                <div className='absolute h-3 w-3 -bottom-[1px] -right-1 bg-green-500 rounded-full'></div>
              </div>
              <span className='text-xs'>{channel.userId.length}</span>
            </div>
          </div>
        </div>
        {/* bookmark */}
        <div className='h-10 flex items-center text-zinc-400 font-medium text-sm border-b-2 border-zinc-700'>
          <div className='flex items-center p-4'>
            <div className='flex gap-1 items-center cursor-pointer'>
              <FaPlus />
              <span className='text-sm'>Add bookmark</span>
            </div>
          </div>
        </div>
        {/* content */}
        <div className='w-full h-full grid-12-10-auto'>
          {/* message */}
          <div className='relative h-full w-full  overflow-auto'>
            <div className='h-full p-4 flex flex-col items-start absolute w-full'>
              <h1 className='text-2xl text-white'># proj-datn</h1>
              <h5 className='text-white'>
                @KUGA created this channel on June 30th. This is the very beginning of the proj-datn channel.
              </h5>
              <div className='flex items-center gap-4 text-white text-base'>
                <div className='flex items-center gap-1 ring-1 border-zinc-700 rounded-md pl-1 pr-1 cursor-pointer'>
                  <FaPencil className='text-sm' />
                  <span>Add description</span>
                </div>
                <div className='flex items-center gap-1 ring-1 border-zinc-700 rounded-md pl-1 pr-1 cursor-pointer'>
                  <IoPersonAdd className='text-sm' />
                  <span>Add people</span>
                </div>
              </div>
              <div className='h-1 w-full border-b-2 border-zinc-700 mt-2 mb-2'></div>
              <div className='w-full'>
                {arrMessage.map((item, indexMessage) => (
                  <Message key={item.id} item={item} indexMessage={indexMessage} onShowThread={handleShowThread} />
                ))}
              </div>
            </div>
          </div>
          {/* input message */}
          <div className='relative h-full w-full flex items-center p-4 text-zinc-400'>
            <div className='flex flex-col items-start justify-around w-full h-full rounded-md ring-1 ring-zinc-600 bg-zinc-900'>
              <div className='w-full flex flex-row items-center justify-start p-1 gap-2'>
                <div className={class_hover_iconInputChat}>
                  <FaB />
                </div>
                <div className={class_hover_iconInputChat}>
                  <FaItalic />
                </div>
                <div className={class_hover_iconInputChat}>
                  <AiOutlineUnderline />
                </div>
                <div className={class_hover_iconInputChat}>
                  <AiOutlineLink />
                </div>
                <div className={class_hover_iconInputChat}>
                  <AiOutlineOrderedList />
                </div>
                <div className={class_hover_iconInputChat}>
                  <AiOutlineBars />
                </div>
                <div className={class_hover_iconInputChat}>
                  <FaCode />
                </div>
                <div className={class_hover_iconInputChat}>
                  <AiOutlineCode />
                </div>
              </div>
              {/* text are */}
              <div className='w-full flex items-center justify-between p-2'>
                <textarea
                  className='p-0 w-full bg-zinc-900 border-none placeholder:text-zinc-400 focus:ring-0'
                  rows={1}
                  placeholder='Message #proj-datn'
                ></textarea>
              </div>
              {/* button bottom */}
              <div className='w-full flex items-center justify-between p-1 gap-2'>
                <div className='flex items-center gap-2'>
                  <div className={class_hover_iconInputChat}>
                    <div className='rounded-full bg-zinc-700 p-[1px]'>
                      <RiAddLine />
                    </div>
                  </div>
                  {!showEmoji && (
                    <div className={class_hover_iconInputChat} onClick={() => setShowEmoji(!showEmoji)}>
                      <FaRegFaceSmile />
                    </div>
                  )}
                  {showEmoji && (
                    <div className={class_hover_iconInputChat} onClick={() => setShowEmoji(!showEmoji)}>
                      <FaFaceSmileBeam className='text-yellow-300 rotate-45' />
                    </div>
                  )}
                  <div className={class_hover_iconInputChat}>
                    <FaAt />
                  </div>
                  <div className='border-r-2 h-4'></div>
                  <div onClick={() => setShowCamera(true)} className={class_hover_iconInputChat}>
                    <BiVideo />
                  </div>
                  <div className={class_hover_iconInputChat}>
                    <BiMicrophone />
                  </div>
                  <div ref={emojiRef} className='relative inline-flex items-center justify-center'>
                    {showEmoji && (
                      <div className='absolute bottom-5 m-4 p-4'>
                        <Picker theme='dark' emojiSize={20} emojiButtonSize={28} onEmojiSelect={AddEmoji} data={data} />
                      </div>
                    )}
                  </div>
                </div>
                {/* button send */}
                <div className='flex items-center'>
                  <div className={handleFocusInput('message').cls_hover}>
                    <FaPaperPlane className='' />
                  </div>
                  <div className='h-4 border-r-[1px] border-zinc-700 mr-1 ml-1'></div>
                  <div className={handleFocusInput('message').cls_hover}>
                    <FaAngleDown className='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* thread */}
      {showThread.status && <Thread onShowThread={handleShowThread} idMessageReplies={showThread.idMessageReplies} />}
    </div>
  )
}

export default memo(Channel)
