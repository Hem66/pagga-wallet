import WebApp from '@twa-dev/sdk'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const backButton = WebApp.BackButton

const BackButton: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const splitPath = pathname.split('/')
  const path = splitPath[splitPath.length - 2]

  const handleNavigate = () => {
    navigate(path || '/')
  }

  useEffect(() => {
    if (pathname === '/') {
      if (backButton.isVisible) {
        backButton.hide()
      }
    } else {
      if (!backButton.isVisible) {
        backButton.show()
      }

      backButton.onClick(handleNavigate)
    }

    return () => {
      backButton.offClick(handleNavigate)
    }
  }, [pathname])

  return null
}

export default BackButton
