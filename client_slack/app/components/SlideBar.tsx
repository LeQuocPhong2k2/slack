import { BiMessageSquareDetail } from 'react-icons/bi'
import { FaAnglesRight, FaAt, FaEllipsisVertical, FaPaperPlane, FaRegFile, FaRegMessage } from 'react-icons/fa6'
import { HiUserGroup } from 'react-icons/hi'
import { RiBarChartGroupedFill, RiLiveLine } from 'react-icons/ri'

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

function SlideBar({ activeItemSlideBar, setActiveItemSlideBar, collapseSlideBar, setCollapseSlideBar }: any) {
  return (
    <div className='relative min-h-full h-10'>
      <div className='h-full w-full flex flex-col items-start bg-zinc-900 text-zinc-400 border-r-2 border-gray-500'>
        <div className='p-1 flex flex-col gap-3 items-center w-full border-b-2 border-b-gray-500'>
          <div
            onClick={() => {
              setActiveItemSlideBar('workspace')
            }}
            style={activeItemSlideBar === 'workspace' ? { color: 'white' } : {}}
            className='cursor-pointer hover:bg-zinc-500 p-1 rounded'
          >
            <RiBarChartGroupedFill />
          </div>
        </div>
        <div className='p-1 flex flex-col gap-3 items-center w-full border-b-2 border-b-gray-500'>
          {arrItemSidebar.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveItemSlideBar(item.title)
              }}
              style={activeItemSlideBar === item.title ? { color: 'white' } : {}}
              className='cursor-pointer hover:bg-zinc-500 p-1 rounded'
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className='p-1 flex flex-col gap-3 items-center w-full'>
          <div
            onClick={() => {
              setActiveItemSlideBar('channel')
            }}
            style={activeItemSlideBar === 'channel' ? { color: 'white' } : {}}
            className='cursor-pointer hover:bg-zinc-500 p-1 rounded'
          >
            <HiUserGroup />
          </div>
          <div
            onClick={() => {
              setActiveItemSlideBar('directMessage')
            }}
            style={activeItemSlideBar === 'directMessage' ? { color: 'white' } : {}}
            className='cursor-pointer hover:bg-zinc-500 p-1 rounded'
          >
            <BiMessageSquareDetail />
          </div>
        </div>
        <div className='p-1 flex flex-col gap-3 items-center w-full absolute bottom-0'>
          <div
            onClick={() => {
              setActiveItemSlideBar('live')
            }}
            style={activeItemSlideBar === 'live' ? { color: 'white' } : {}}
            className='cursor-pointer hover:bg-zinc-500 p-1 rounded'
          >
            <RiLiveLine />
          </div>
        </div>
      </div>
      <div className='absolute -right-2 top-2/4 flex items-center justify-center h-4 w-4'>
        <div
          onClick={() => {
            setCollapseSlideBar(!collapseSlideBar)
          }}
          className='z-50 flex relative cursor-pointer rounded-full text-slate-200 bg-zinc-600 p-2 opacity-80 active:bg-zinc-600 hover:bg-zinc-500'
        >
          <div className='h-5 w-5'></div>
          <div className='absolute flex items-center w-5 h-5 -right-0'>
            <FaAnglesRight />
          </div>
          <div className='absolute -left-1 -top-1 h-10 w-5 bg-zinc-900 text-zinc-900'>.</div>
        </div>
      </div>
    </div>
  )
}

export default SlideBar
