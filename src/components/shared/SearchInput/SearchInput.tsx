'use client'

import { TextInput, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Szukaj...',
  size = 'xl',
}: SearchInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      size={size}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />}
      styles={{
        input: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid var(--mantine-color-gray-3)',
        },
      }}
    />
  )
}
