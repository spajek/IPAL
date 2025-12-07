'use client'

import { useState } from 'react'

export function useModal<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const open = (modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData)
    }
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setData(null)
  }

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  }
}
