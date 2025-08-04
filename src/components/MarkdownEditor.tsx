'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'

// MDEditor를 동적으로 임포트하여 클라이언트 사이드에서만 렌더링
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50">
        <div className="text-gray-500">마크다운 에디터 로딩 중...</div>
      </div>
    )
  }
)

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
  placeholder?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  height = 300,
  placeholder = "마크다운을 입력하세요..."
}: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[300px] flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50">
        <div className="text-gray-500">마크다운 에디터 로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="live"
        height={height}
        data-color-mode="light"
        visibleDragBar={false}
        textareaProps={{
          placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'inherit'
          }
        }}
      />
    </div>
  )
}