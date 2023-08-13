'use client'
import { RiChatSmile3Line, RiMessage2Line, RiPushpin2Line, RiPushpinFill } from 'react-icons/ri'
import { BsFillPinAngleFill } from 'react-icons/bs'
import Image from 'next/image'
import { useState, memo } from 'react'
import { useRef } from 'react'
import {
  AiOutlineBars,
  AiOutlineCode,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiTwotonePushpin
} from 'react-icons/ai'
import {
  FaAngleDown,
  FaAngleLeft,
  FaAt,
  FaB,
  FaCirclePlus,
  FaCode,
  FaComment,
  FaCommentDots,
  FaCrown,
  FaHandsBubbles,
  FaItalic,
  FaMicrophone,
  FaPaperPlane,
  FaPlus,
  FaRegEye,
  FaRegFaceSmile,
  FaRegMessage,
  FaRegStar,
  FaSquareCheck,
  FaStar,
  FaVideo,
  FaXmark
} from 'react-icons/fa6'
import { on } from 'events'
let arruser = [
  {
    id: 1,
    name: 'Kuga',
    image: '/images.png'
  },
  {
    id: 2,
    name: 'Phòng Em',
    image: '/avata.png'
  }
]

let arrmessage = [
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
  }
]

function Thread({ onShowThread, idMessageReplies: idMessageReplies }: any) {
  const [showToolsMessage, setShowToolMessage] = useState({
    index: -1,
    options: ''
  })
  function HoverShowToolMessage(index: any, option: string) {
    if (showToolsMessage.index === index && showToolsMessage.options === option) {
      return 'flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md' + ' ' + option
    } else {
      return 'flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md hidden' + ' ' + option
    }
  }
  return (
    <div className='w-3/6 h-full border-l-2 border-zinc-700'>
      {/* header thread */}
      <div className='h-[8%] flex items-center border-b-2 border-zinc-700'>
        <div className='flex items-center justify-between w-full p-2'>
          <div className='flex items-center gap-2'>
            <div className='text-white hover:bg-slate-600 p-2 rounded cursor-pointer'>
              <FaAngleLeft className='text-white' />
            </div>
            <span className='text-white font-semibold'>Thread</span>
            <span className='text-slate-400 text-sm'># proj-datn</span>
          </div>
          <div
            className='text-white hover:bg-slate-600 p-2 rounded cursor-pointer'
            onClick={() => {
              onShowThread(false, 0)
            }}
          >
            <FaXmark />
          </div>
        </div>
      </div>
      {/* content message */}
      <div className='h-[91%]'>
        <div className='overflow-y-scroll max-h-full'>
          {/* message replies */}
          <div className='flex items-center gap-1 border-b-2 border-zinc-700'>
            <div className='w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1'>
              <div className='flex items-start space-x-2 m-1'>
                <Image
                  className='rounded mt-2'
                  src={arruser.find((e) => e.id == arrmessage[idMessageReplies - 1].userid)?.image as string}
                  alt='logo'
                  width={35}
                  height={35}
                />
                <div className='font-medium text-white w-full'>
                  <div className='relative inline-flex items-center gap-[1px]'>
                    <div className='relative inline-flex mr-1'>
                      <span className=''>
                        {arruser.find((e) => e.id == arrmessage[idMessageReplies - 1].userid)?.name}
                      </span>
                    </div>
                    <span className='text-xs text-slate-400'>{arrmessage[idMessageReplies - 1].times}</span>
                  </div>
                  {/* message wrapper */}
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    {/* message */}
                    <div
                      onMouseLeave={() => HoverShowToolMessage(null, 'thread')}
                      className='relative flex justify-start items-center  hover:bg-slate-600 ease-out duration-200'
                    >
                      <div className='relative inline-flex items-center'>
                        <span className='text-slate-400'>{arrmessage[idMessageReplies - 1].content}</span>
                        <div className='absolute inline-flex items-center justify-center w-5 h-5 text-sm text-red-500 -top-2 -right-4 dark:border-gray-900'>
                          <BsFillPinAngleFill />
                        </div>
                      </div>
                      <div className='hidden'>
                        <FaSquareCheck className='cursor-pointer hover:scale-90 text-green-500' />
                        <FaRegEye className='cursor-pointer hover:scale-90 text-white' />
                        <FaHandsBubbles className='cursor-pointer hover:scale-90 text-yellow-200' />
                        <div className='cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50'>
                          <FaRegFaceSmile />
                          <span>React</span>
                        </div>
                        <div className='cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50'>
                          <FaRegMessage />
                          <span>Reply</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* user replies */}
          <div className='flex items-center gap-1'>
            <div className='w-full grid grid-cols-1 grid-flow-row items-end p-1 m-1'>
              {arrmessage[idMessageReplies - 1].comment.map((item, index) => (
                <div key={item.id} className='flex items-start space-x-2 m-1'>
                  <Image
                    className='rounded mt-1'
                    src={arruser.find((e) => e.id == item.userid)?.image as string}
                    alt='logo'
                    width={40}
                    height={40}
                  />
                  <div className='font-medium text-white w-full'>
                    <div className='relative inline-flex items-center'>
                      <div className='relative inline-flex mr-1'>
                        <span className=''>{arruser.find((e) => e.id == item.userid)?.name as string}</span>
                      </div>
                      <span className='text-xs text-slate-400'>{item.times}</span>
                    </div>
                    {/* message wrapper */}
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      {/* message */}
                      <div
                        key={item.id}
                        onMouseEnter={() => {
                          HoverShowToolMessage(index, 'thread')
                          setShowToolMessage({
                            index: index as number,
                            options: 'thread'
                          })
                        }}
                        onMouseLeave={() => {
                          HoverShowToolMessage(-1, '')
                          setShowToolMessage({
                            index: -1,
                            options: ''
                          })
                        }}
                        className='relative flex justify-start items-center cursor-pointer hover:bg-slate-600 ease-out duration-200'
                      >
                        <div className='relative inline-flex items-center'>
                          <span className='text-slate-400 pt-1 pb-1'>{item.comment}</span>
                        </div>
                        <div className={HoverShowToolMessage(index, 'thread')}>
                          <FaSquareCheck className='cursor-pointer hover:scale-90 text-green-500' />
                          <FaRegEye className='cursor-pointer hover:scale-90 text-white' />
                          <FaHandsBubbles className='cursor-pointer hover:scale-90 text-yellow-200' />
                          <div className='cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50'>
                            <FaRegFaceSmile />
                            <span>React</span>
                          </div>
                          <div className='cursor-pointer hover:scale-90 flex gap-1 justify-center items-center text-xs text-yellow-50'>
                            <FaRegMessage />
                            <span>Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* input */}
          <div className='border-t-2 border-zinc-700'>
            <div className='grid grid-flow-row mt-4 m-4 p-2 bg-zinc-800 rounded-lg ring-1 ring-zinc-500'>
              <div className='flex items-center gap-4 text-zinc-400 p-1'>
                <FaB />
                <FaItalic />
                <AiOutlineUnderline />
                <AiOutlineLink />
                <AiOutlineOrderedList />
                <AiOutlineBars />
                <FaCode />
                <AiOutlineCode />
              </div>
              <textarea
                rows={1}
                className='p-1 bg-zinc-800 border-none placeholder:text-zinc-500 focus:ring-0 text-white'
                placeholder='Write a message...'
              />
              <div className='flex items-center justify-between text-zinc-400'>
                <div className='flex gap-4 p-1'>
                  <FaCirclePlus />
                  <FaRegFaceSmile />
                  <FaAt />
                  <FaVideo />
                  <FaMicrophone />
                </div>
                <div className='flex items-center rounded p-1 bg-zinc-800 text-zinc-400'>
                  <div className='cursor-pointer ease-linear duration-200 p-1'>
                    <FaPaperPlane className='' />
                  </div>
                  <div className='h-4 border-r-[1px] border-zinc-700 p-0 m-0'></div>
                  <div className='cursor-pointer ease-linear duration-200 p-1'>
                    <FaAngleDown className='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Thread)
