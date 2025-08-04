'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'

// MDEditor.Markdown을 동적으로 임포트
const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  { 
    ssr: false,
    loading: () => (
      <div className="text-gray-500 p-4">
        마크다운 내용 로딩 중...
      </div>
    )
  }
)

interface MarkdownViewerProps {
  source: string
  className?: string
}

export default function MarkdownViewer({ source, className = '' }: MarkdownViewerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`text-gray-500 p-4 ${className}`}>
        마크다운 내용 로딩 중...
      </div>
    )
  }

  if (!source.trim()) {
    return (
      <div className={`text-gray-500 italic ${className}`}>
        내용이 없습니다.
      </div>
    )
  }

  return (
    <div className={className} data-color-mode="light">
      <MDEditorMarkdown 
        source={source} 
        style={{ 
          backgroundColor: 'transparent',
          color: '#374151',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
      />
    </div>
  )
}