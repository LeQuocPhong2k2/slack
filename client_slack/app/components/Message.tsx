import Image from 'next/image'
import { memo, useState } from 'react'
import { FaHandsBubbles, FaRegEye, FaRegFaceSmile, FaRegMessage, FaSquareCheck } from 'react-icons/fa6'

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

const Message = ({ item, onShowThread }: any) => {
  const [showToolsMessage, setShowToolMessage] = useState({
    index: -1,
    options: ''
  })

  function handleHoverShowToolMessage(index: any, option: string) {
    if (showToolsMessage.index === index && showToolsMessage.options === option) {
      return 'flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md' + ' ' + option
    } else {
      return 'flex gap-2 mr-2 absolute bottom-5 right-0 ring-1 ring-slate-400 p-2 rounded-md hidden' + ' ' + option
    }
  }

  return (
    <div key={item.id} className='flex items-start space-x-2'>
      <Image
        className='rounded mt-1'
        src={arruser.find((e) => e.id == item.userid)?.image as string}
        alt='logo'
        width={40}
        height={40}
      />
      <div className='font-medium w-full'>
        <div className='relative inline-flex items-center'>
          <div className='relative inline-flex mr-1 text-zinc-200'>
            <span className=''>{arruser.find((e) => e.id == item.userid)?.name}</span>
          </div>
          <span className='text-xs text-zinc-400'>{item.times}</span>
        </div>
        {/* message wrapper */}
        <div className='text-sm text-zinc-400 dark:text-gray-400'>
          {/* message */}
          <div
            key={item.id}
            onMouseEnter={() => {
              handleHoverShowToolMessage(item.id, 'message')
              setShowToolMessage({
                index: item.id as number,
                options: 'message'
              })
            }}
            onMouseLeave={() => {
              handleHoverShowToolMessage(-1, '')
              setShowToolMessage({
                index: -1,
                options: ''
              })
            }}
            className='relative flex justify-start items-center cursor-pointer hover:bg-zinc-800 ease-out duration-200'
          >
            <div className='relative inline-flex items-center'>
              <span className='text-zinc-400 pt-1 pb-1'>{item.content}</span>
            </div>
            <div className={handleHoverShowToolMessage(item.id, 'message')}>
              <div className='cursor-pointer hover:bg-zinc-800 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-green-400'>
                <FaSquareCheck />
              </div>
              <div className='cursor-pointer hover:bg-zinc-800 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-yellow-50'>
                <FaRegEye />
              </div>
              <div className='cursor-pointer hover:bg-zinc-800 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-yellow-200'>
                {' '}
                <FaHandsBubbles />
              </div>
              <div className='cursor-pointer hover:bg-zinc-800 active:bg-slate-400 rounded-t-md p-1 flex gap-1 justify-center items-center text-xs text-yellow-50'>
                <FaRegFaceSmile />
                <span>React</span>
              </div>
              <div
                onClick={() => {
                  onShowThread(true, item.id)
                }}
                className='cursor-pointer hover:bg-zinc-800 rounded-t-md active:bg-slate-400 p-1 flex gap-1 justify-center items-center text-xs text-yellow-50'
              >
                <FaRegMessage />
                <span>Reply</span>
              </div>
            </div>
          </div>
          {/* count replies */}
          <div className='relative inline-flex items-center justify-center gap-2 text-blue-400 font-normal pt-1'>
            <div className='flex items-center justify-center gap-1'>
              <div className='flex -space-x-3'>
                {item.comment.map((item: any, index: any) => (
                  <Image
                    key={index}
                    className='w-6 h-6 border-2 border-white rounded-full dark:border-gray-800'
                    src={arruser.find((e) => e.id == item.userid)?.image as string}
                    alt='logo'
                    width={25}
                    height={25}
                  />
                ))}
                {item.comment.length > 2 ? (
                  <a
                    className='flex items-center justify-center w-6 h-6 text-xs font-medium text-zinc-100 bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800'
                    href='#'
                  >
                    {item.comment.length - 2 > 0 ? `+${item.comment.length - 2}` : ''}
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <span className='cursor-pointer text-blue-400'>{item.comment.length} replies</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Message)
