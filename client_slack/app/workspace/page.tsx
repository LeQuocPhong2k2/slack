'use client'
import { Button, Dropdown, Tooltip } from 'flowbite-react'
import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import { useRef } from 'react'
import { BiMicrophone, BiVideo } from 'react-icons/bi'
import Webcam from 'react-webcam'
import { AiOutlineBars, AiOutlineCode, AiOutlineLink, AiOutlineOrderedList, AiOutlineUnderline } from 'react-icons/ai'
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaAt,
  FaB,
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaChevronDown,
  FaCircle,
  FaCircleInfo,
  FaCode,
  FaCreativeCommonsBy,
  FaEllipsisVertical,
  FaFaceSmileBeam,
  FaHeadphones,
  FaItalic,
  FaMagnifyingGlass,
  FaPaperPlane,
  FaPenToSquare,
  FaPencil,
  FaPlus,
  FaRegCircleQuestion,
  FaRegFaceSmile,
  FaRegFile,
  FaRegMessage,
  FaRegSquarePlus,
  FaSliders,
  FaXmark
} from 'react-icons/fa6'
import { RiAddLine, RiLiveLine } from 'react-icons/ri'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Thread from '../components/Thread'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchChannels, getChannelList, setChannelList } from '@/redux/slice/channelSlice'
import { get } from 'http'
import { IChannel, IUser } from '@/redux/slice/types'
import Channel from '../components/Channel'
import { useGetChannelByIdQuery } from '@/redux/api/chanelAPI'
import { RiBarChartGroupedFill } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi2'
import { BiMessageSquareDetail } from 'react-icons/bi'
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

let arrItemSidebar = [
  {
    id: 1,
    icon: <FaRegMessage />,
    title: 'Threads'
  },
  {
    id: 2,
    icon: <FaAt />,
    title: 'Mentions & reactions'
  },
  {
    id: 3,
    icon: <FaPaperPlane />,
    title: 'Dafts & sent'
  },
  {
    id: 4,
    icon: <FaRegFile />,
    title: 'Files'
  },
  {
    id: 5,
    icon: <FaEllipsisVertical />,
    title: 'More'
  }
]

let socket: any

function App() {
  // -------------------------------------------------------------------
  const [showAbsoluteWorkSpace, setShowAbsoluteWorkSpace] = useState(false)
  const [showMenuWorkspace, setShowMenuWorkspace] = useState(false)
  let workspaceRef = useRef<any>()
  console.log(workspaceRef)
  useEffect(() => {
    let handle = (e: any) => {
      if (workspaceRef.current && !workspaceRef.current.contains(e.target)) {
        setShowMenuWorkspace(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
    }
  })
  // ------------------------------ State ------------------------------
  const [showMenuChannel, setShowMenuChannel] = useState(false)
  const [showDirectMessage, setShowDirectMessage] = useState(false)
  const [activeItemSlideBar, setActiveItemSlideBar] = useState('')
  const [itemChannels, setItemChannels] = useState<IChannel>()

  const dispatch = useDispatch<AppDispatch>()

  const getChannel = async () => {
    const res = await fetch('http://localhost:5000/api/channels')
    const data = await res.json()
    dispatch(setChannelList(data))
  }
  useEffect(() => {
    getChannel()
  }, [])
  let arrChannel = useSelector(getChannelList)

  return (
    <main className='min-h-screen w-full grid-20-80 bg-blue-600'>
      {/* top */}
      <div className='flex items-center justify-between bg-fuchsia-900 p-2'>
        <div className='flex items-center bg-slate-300 p-1 rounded-md'>
          <input type='text' className='p-0 border-0 bg-slate-300 focus:ring-0' />
          <div className='flex items-center gap-2'>
            <FaSliders />
            <FaMagnifyingGlass />
          </div>
        </div>
        <div className='flex items-center p-1 mr-2'>
          <FaCircleInfo className='m-2 text-white' />
          <Image className='rounded-full bg-white' src='/avata.png' alt='logo' width={35} height={35} />
          <span className='text-white font-sans'>lequocphong@gmail.com</span>
        </div>
      </div>
      {/* bottom */}
      <div className='min-h-full w-full grid-20-80-columns bg-zinc-900'>
        {/* left */}
        <div className='min-h-full min-w-15rem relative flex flex-col border-r-2 border-zinc-700 text-zinc-400 font-normal'>
          <div className='h-12 border-b-2 border-zinc-700'>
            <div className='flex items-center justify-between p-2'>
              <div
                ref={workspaceRef}
                onClick={() => setShowMenuWorkspace(!showMenuWorkspace)}
                className='cursor-pointer flex items-center justify-center gap-1 p-1 rounded-md hover:bg-zinc-800'
              >
                <h1>datn</h1>
                <FaAngleDown />
              </div>
              <div className='bg-white p-2 rounded-full'>
                <FaPenToSquare className='text-black' />
              </div>
              {/* absolute workspace */}
              {showMenuWorkspace && (
                <div className='z-50 w-60 absolute flex flex-col items-start top-9 -right-4 rounded-md ring-1 ring-zinc-600 bg-zinc-800 shadow-md text-slate-300'>
                  <div className='grid grid-cols-3 grid-rows-1 items-center p-2 '>
                    <Image className='rounded' src='/avata.png' width={45} height={40} alt='add' />
                    <div className='col-span-2 flex flex-col'>
                      <h1>datn</h1>
                      <span>datn-co.slack.com</span>
                    </div>
                  </div>
                  <div className='flex w-full  border-t-2 border-zinc-600'>
                    <ul className='w-full '>
                      <li className='w-full p-2 hover:bg-sky-600 hover:text-white cursor-pointer'>
                        <span>Invite people to datn</span>
                      </li>
                      <li className='w-full p-2 hover:bg-sky-600 hover:text-white cursor-pointer'>
                        <span>Create a channel</span>
                      </li>
                    </ul>
                  </div>
                  <div className='flex w-full border-t-2 border-zinc-600'>
                    <ul className='w-full'>
                      <li className='w-full p-2 hover:bg-sky-600 hover:text-white cursor-pointer'>
                        <span>Sign out of datn</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    onMouseLeave={() => setShowAbsoluteWorkSpace(false)}
                    onMouseOver={() => setShowAbsoluteWorkSpace(true)}
                    className='flex w-full border-t-2 border-zinc-600'
                  >
                    <div className='w-full p-2 flex items-center justify-between hover:bg-sky-600 hover:text-white cursor-pointer'>
                      <span>Add workspaces</span>
                      <FaAngleRight />
                    </div>
                    {/* absolute */}
                    {showAbsoluteWorkSpace && (
                      <div className='absolute -right-[13.5rem] ring-1 ring-zinc-600 cursor-pointer rounded-md flex items-center shadow-md bg-zinc-800'>
                        <ul className='flex flex-col gap-2 mt-2'>
                          <li className='w-full p-1 hover:bg-sky-600 hover:text-white cursor-pointer'>
                            Sign in to another workspace
                          </li>
                          <li className='w-full p-1 hover:bg-sky-600 hover:text-white cursor-pointer'>
                            Create a new workspace
                          </li>
                          <li className='w-full p-1 hover:bg-sky-600 hover:text-white cursor-pointer'>
                            Find workspaces
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='h-50 border-b-2 border-zinc-700'>
            <ul className='cursor-pointer text-zinc-400 font-normal list-inside dark:text-gray-400'>
              {arrItemSidebar.map((item, index) => (
                <li
                  onClick={() => setActiveItemSlideBar(item.title)}
                  key={item.id}
                  className='relative flex items-center gap-2 hover:bg-zinc-800 ease-out duration-100 rounded-lg p-1 m-2'
                  style={activeItemSlideBar === item.title ? { backgroundColor: 'rgb(39 39 42)', color: 'white' } : {}}
                >
                  {item.icon}
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className='h-96 relative overflow-hidden'>
            <ul className='h-full overflow-auto text-zinc-400 font-normal list-inside dark:text-gray-400'>
              <li className='flex items-center gap-1 rounded-lg p-1'>
                <div className='p-1 hover:bg-zinc-800 ease-out duration-300 rounded'>
                  {showMenuChannel ? (
                    <FaCaretDown onClick={() => setShowMenuChannel(!showMenuChannel)} className='cursor-pointer' />
                  ) : (
                    <FaCaretRight onClick={() => setShowMenuChannel(!showMenuChannel)} className='cursor-pointer' />
                  )}
                </div>
                <div className='font-normal flex items-center gap-1 cursor-pointer hover:bg-zinc-800 ease-out duration-100 rounded'>
                  <Dropdown inline label='Channels'>
                    <Dropdown.Item>Create</Dropdown.Item>
                    <Dropdown.Item>Manage</Dropdown.Item>
                  </Dropdown>
                </div>
              </li>
              {showMenuChannel && (
                <ul className='flex flex-col gap-2'>
                  {arrChannel.map((item: IChannel, index: number) => (
                    <li
                      style={
                        activeItemSlideBar === item.name ? { backgroundColor: 'rgb(39 39 42)', color: 'white' } : {}
                      }
                      onClick={() => {
                        setActiveItemSlideBar(item.name)
                        setItemChannels(item)
                      }}
                      key={index}
                      className='cursor-pointer flex items-center gap-2 hover:bg-zinc-800 ease-out duration-100 rounded-lg p-1 mr-2 ml-2'
                    >
                      <span className='font-bold text-xl italic ml-1'>#</span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
              <li className='flex items-center gap-1 rounded-lg p-1'>
                <div className='p-1 hover:bg-zinc-800 ease-out duration-300 rounded'>
                  {showDirectMessage ? (
                    <FaCaretDown onClick={() => setShowDirectMessage(!showDirectMessage)} className='cursor-pointer' />
                  ) : (
                    <FaCaretRight onClick={() => setShowDirectMessage(!showDirectMessage)} className='cursor-pointer' />
                  )}
                </div>
                <div className='font-normal flex items-center gap-14 cursor-pointer'>
                  <div className='hover:bg-zinc-800 ease-out duration-100 rounded'>
                    <Dropdown inline label='Direct messages'>
                      <Dropdown.Item>Create</Dropdown.Item>
                      <Dropdown.Item>Manage</Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </li>
              {showDirectMessage && (
                <ul className=''>
                  {arrChannel.map((item: IChannel, index: number) =>
                    item.users.map(
                      (user: IUser, index: number) => (
                        console.log(item.users.length),
                        (
                          <li
                            style={
                              activeItemSlideBar === user.name
                                ? { backgroundColor: 'rgb(39 39 42)', color: 'white' }
                                : {}
                            }
                            onClick={() => {
                              setActiveItemSlideBar(user.name)
                              setItemChannels(item)
                            }}
                            key={index}
                            className='cursor-pointer flex items-center gap-2 hover:bg-zinc-800 ease-out duration-100 rounded-lg m-2 p-1'
                          >
                            <Image className='rounded bg-white' src='/images.jpg' alt='logo' width={20} height={20} />
                            {user.name}
                          </li>
                        )
                      )
                    )
                  )}
                  <li className='flex items-center gap-2 hover:bg-zinc-800 ease-out duration-100 rounded-lg m-2 p-1'>
                    <FaRegSquarePlus />
                    Add coworkers
                  </li>
                </ul>
              )}
            </ul>
          </div>
          <div className='absolute bottom-0 w-full border-t-2 border-zinc-700 pb-2 flex items-center justify-between rounded-t-xl p-2'>
            <div className='flex items-center justify-center text-white font-normal gap-1'>
              <span>datn</span>
              <FaChevronDown />
            </div>
            <div className='flex items-center gap-2 text-slate-700 rounded-xl border-2 p-1 cursor-pointer'>
              <FaCircle />
              <FaHeadphones />
            </div>
          </div>
        </div>
        {/* right */}
        {/* <div></div> */}
        {itemChannels && <Channel channel={itemChannels} />}
      </div>
    </main>
  )
}

export default App
