'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBandcamp } from 'react-icons/fa6'

interface Item {
  img: StaticImageData
  desc: string
  title: string
  buttonIcon: StaticImageData
}

export default function ProgressiveCarousel({ items }: { items: Item[] }) {
  const duration: number = 5000
  const itemsRef = useRef<HTMLDivElement>(null)
  const frame = useRef<number>(0)
  const firstFrameTime = useRef(performance.now())
  const [active, setActive] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    firstFrameTime.current = performance.now()
    frame.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame.current)
    }
  }, [active])

  const animate = (now: number) => {
    let timeFraction = (now - firstFrameTime.current) / duration
    if (timeFraction <= 1) {
      setProgress(timeFraction * 100)
      frame.current = requestAnimationFrame(animate)
    } else {
      timeFraction = 1
      setProgress(0)
      setActive((active + 1) % items.length)
    }
  }

  const heightFix = () => {
    if (itemsRef.current && itemsRef.current.parentElement)
      itemsRef.current.parentElement.style.height = `${itemsRef.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto text-center relative">
      <div className="transition-all duration-150 delay-300 mb-2 ease-in-out">
        <div className="relative h-full " ref={itemsRef}>
          {items.map((item, index) => (
            <AnimatePresence mode="popLayout">
              {active === index && (
                <motion.figure
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2 h-full "
                >
                  <Image
                    className="rounded-xl h-[650px] object-cover"
                    src={item.img}
                    width={1900}
                    height={1080}
                    alt={item.desc}
                  />
                </motion.figure>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-white/20 backdrop-blur-md overflow-hidden  grid grid-cols-2 md:grid-cols-4  rounded-md">
        {items.map((item, index) => (
          <button
            key={index}
            className={`relative px-2 py-5 text-left ${
              active === index
                ? ''
                : 'opacity-50  group-hover:opacity-100 group-focus:opacity-100 transition-opacity border-l'
            }`}
            onClick={() => {
              setActive(index)
              setProgress(0)
            }}
          >
            <>
              <h2 className="relative px-4 rounded-full w-fit bg-gray-900 mb-2">
                {item?.title}
              </h2>
              <p className="text-sm font-medium text-slate-900 line-clamp-2">
                {item.desc}
              </p>
              <div
                className="block absolute top-0 left-0 h-full overflow-auto -z-10 w-full bg-white/20 backdrop-blur-md  "
                role="progressbar"
                aria-valuenow={active === index ? progress : 0}
              >
                <span
                  className="absolute inset-0 bg-white "
                  style={{ width: active === index ? `${progress}%` : '0%' }}
                ></span>
              </div>
            </>
          </button>
        ))}
      </div>
    </div>
  )
}
