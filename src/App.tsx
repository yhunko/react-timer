import React, { useState, createRef, useRef, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import type { Theme } from '@material-ui/core'

import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import ClearIcon from '@material-ui/icons/Clear'

import RED from '@material-ui/core/colors/red'
import AMBER from '@material-ui/core/colors/amber'
import GREEN from '@material-ui/core/colors/green'

import './index.css'

import Chart from './components/Chart'

const TIMER_ENDED_TIMEOUT = 3000
const DEFAULT_MINUTES = 1
const DEFAULT_SECONDS = 15

const DangerButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: RED[500],
    '&:hover': {
      backgroundColor: RED[600],
    },
  },
}))(Button)
const WarningButton = withStyles(() => ({
  root: {
    backgroundColor: AMBER[500],
    '&:hover': {
      backgroundColor: AMBER[600],
    },
  },
}))(Button)
const SuccessButton = withStyles(() => ({
  root: {
    backgroundColor: GREEN[500],
    '&:hover': {
      backgroundColor: GREEN[600],
    },
  },
}))(Button)

const minutesInput = createRef<HTMLInputElement>()
const secondsInput = createRef<HTMLInputElement>()

function getTime(initSeconds: number): { minutes: number; seconds: number } {
  const minutes = Math.floor(initSeconds / 60)
  const seconds = initSeconds - minutes * 60

  return { minutes, seconds }
}

function Timer() {
  const [count, setCount] = useState(0)
  const [initialCount, setInitialCount] = useState(0)
  const [isPaused, setPaused] = useState(false)
  const [isEnded, setEnded] = useState(false)
  const [notifPermission, setNotifPermission] = useState('default')

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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap={2}
        m={2}
        p={2}
      >
        <TextField
          inputRef={minutesInput}
          type="number"
          label="Minutes"
          defaultValue={DEFAULT_MINUTES}
        />
        <TextField
          inputRef={secondsInput}
          type="number"
          label="Seconds"
          defaultValue={DEFAULT_SECONDS}
        />

        <Box mt={2} minWidth="150px">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: '100%' }}
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
          </Button>
        </Box>
      </Box>
    )
  }

  function TimerCharts() {
    const { minutes, seconds } = getTime(count)

    return (
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Box display="flex" flexDirection="row">
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
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gridGap={5}
          mt={5}
        >
          {isPaused ? (
            <SuccessButton
              variant="contained"
              startIcon={<PlayIcon />}
              onClick={startTimer}
            >
              Resume
            </SuccessButton>
          ) : (
            <WarningButton
              variant="contained"
              startIcon={<PauseIcon />}
              onClick={stopTimer}
            >
              Pause
            </WarningButton>
          )}
          <DangerButton
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={clearTimer}
          >
            Clear
          </DangerButton>
        </Box>
      </Box>
    )
  }

  function enableNotifications() {
    Notification.requestPermission().then((permission) => {
      setNotifPermission(permission)
    })
  }

  function NotifPermissionBtn() {
    return (
      notifPermission === 'granted' || (
        <Button
          variant="contained"
          color="primary"
          onClick={enableNotifications}
          disabled={notifPermission === 'denied'}
        >
          Enable notifications
        </Button>
      )
    )
  }

  useEffect(() => {
    setNotifPermission(Notification.permission)
  })

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {count === 0 && TimeInputs()}
      {count > 0 && TimerCharts()}
      <div className="mt-2">{NotifPermissionBtn()}</div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isEnded}
        message="Timer has ended"
      />
    </Box>
  )
}

export default Timer
