import React, { useState, createRef, useRef, useEffect } from 'react'

import './index.css'

const TIMER_ENDED_TIMEOUT = 3000
const DEFAULT_MINUTES = 1
const DEFAULT_SECONDS = 15

const minutesInput = createRef<HTMLInputElement>()
const secondsInput = createRef<HTMLInputElement>()

type Chart = {
  percent: number
  color: string
  count: number
  text: string
}

function getTime(initSeconds: number): { minutes: number; seconds: number } {
  const minutes = Math.floor(initSeconds / 60)
  const seconds = initSeconds - minutes * 60

  return { minutes, seconds }
}

function Chart({ percent, color, count, text }: Chart) {
  return (
    <svg
      viewBox="0 0 36 36"
      className="block"
      style={{
        maxWidth: '250px',
      }}
    >
      <path
        className="circle"
        strokeDasharray={percent + ', 100'}
        stroke={color}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="50%" y="50%" textAnchor="middle" className="small">
        <tspan x="50%" y="43%">
          {count}
        </tspan>
        <tspan x="50%" y="57%">
          {text}
        </tspan>
      </text>
    </svg>
  )
}

function Timer() {
  const [count, setCount] = useState(0)
  const [initialCount, setInitialCount] = useState(0)
  const [isPaused, setPaused] = useState(false)
  const [isEnded, setEnded] = useState(false)
  const [notifPermission, setNotifPermission] = useState('')

  const timer = useRef(0)

  function showNotification(title: string, body?: string) {
    if (!document.hasFocus() && notifPermission === 'granted') {
      new Notification(title, { body, tag: 'timerNotification' })
    }
  }

  function startTimer() {
    setPaused(false)

    timer.current = setInterval(function tick() {
      setCount((prevCount) => {
        if (prevCount === 1) {
          const { minutes, seconds } = getTime(initialCount)

          setEnded(true)
          setTimeout(() => {
            setEnded(false)
          }, TIMER_ENDED_TIMEOUT)
          stopTimer()
          showNotification(
            'Timer has ended!',
            `Time elapsed: ${minutes}:${seconds}`
          )
          return 0
        }

        return prevCount - 1
      })
    }, 1000)
  }

  function stopTimer() {
    setPaused(true)

    if (timer) {
      clearInterval(timer.current)
    }
  }

  function clearTimer() {
    stopTimer()
    setPaused(false)
    setCount(0)
  }

  function TimeInputs() {
    return (
      <div className="flex flex-col justify-center gap-2 m-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <label htmlFor="minutesInput">Minutes:</label>
          <input
            id="minutesInput"
            defaultValue={DEFAULT_MINUTES}
            ref={minutesInput}
            type="number"
            min="0"
            max="59"
            pattern="[0-59]"
            maxLength={2}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <label htmlFor="secondsInput">Seconds:</label>
          <input
            id="secondsInput"
            defaultValue={DEFAULT_SECONDS}
            ref={secondsInput}
            type="number"
            min="1"
            max="59"
            pattern="[1-59]"
            maxLength={2}
            required
          />
        </div>

        <button
          className="primary"
          onClick={() => {
            const minutes = Number(minutesInput?.current?.value) || 0
            const seconds = Number(secondsInput?.current?.value) || 0
            const time = minutes * 60 + seconds

            setCount(time)
            setInitialCount(time)

            startTimer()
          }}
        >
          Start
        </button>
      </div>
    )
  }

  function TimerCharts() {
    const { minutes, seconds } = getTime(count)

    return (
      <div className="flex flex-col justify-around">
        <div className="flex flex-row">
          <Chart
            percent={(count / 60 / (initialCount / 60)) * 100}
            color="red"
            count={minutes}
            text={`minute${minutes > 1 ? 's' : ''}`}
          />
          <Chart
            percent={(seconds / 60) * 100}
            color="green"
            count={seconds}
            text={`second${seconds > 1 ? 's' : ''}`}
          />
        </div>

        <div className="flex flex-row justify-center gap-5 mt-5">
          {isPaused ? (
            <button className="success" onClick={startTimer}>
              Resume
            </button>
          ) : (
            <button className="warning" onClick={stopTimer}>
              Pause
            </button>
          )}
          <button className="danger" onClick={clearTimer}>
            Clear
          </button>
        </div>
      </div>
    )
  }

  function TimerEnded() {
    return (
      <div className="my-10 mx-5">
        <h1 className="text-4xl font-bold">Timer ended</h1>
      </div>
    )
  }

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      setNotifPermission(permission)
    })
  })

  return (
    <div className="flex justify-center">
      {count === 0 && !isEnded && TimeInputs()}
      {isEnded && TimerEnded()}
      {count > 0 && TimerCharts()}
    </div>
  )
}

export default Timer
