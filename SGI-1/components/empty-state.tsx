"use client"

import type { ReactNode } from "react"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  isDark?: boolean
}

export function EmptyState({ icon, title, description, action, isDark }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center transition-all duration-300">
      <div className={`rounded-full p-4 mb-4 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>{icon}</div>
      <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <p className={`mb-6 max-w-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
      {action}
    </div>
  )
}
