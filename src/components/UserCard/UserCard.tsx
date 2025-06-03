"use client"

import Link from "next/link"
import { useState } from "react"
import styles from "./UserCard.module.css"
import Image from "next/image"
import { logout } from "@/actions/logout"

interface UserCardProps {
  user: {
    id: string
    username: string
    avatar?: string
    createdAt: string
  }
}

// SVG Icons as components
const CalendarIcon = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const LogOutIcon = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const EditIcon = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

const FileTextIcon = () => (
  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export default function UserCard({
  user = {
    id: "1",
    username: "johndoe",
    avatar: "/placeholder.svg?height=80&width=80",
    createdAt: "2023-01-15",
  },
  
}:UserCardProps) {
  const [imageError, setImageError] = useState(false)

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase()
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {user.avatar && !imageError ? (
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.username}'s avatar`}
                className={styles.avatarImage}
                onError={() => setImageError(true)}
                width={80}
                height={80}
              />
            ) : (
              <span className={styles.avatarFallback}>{getInitials(user.username)}</span>
            )}
          </div>

          <div className={styles.userInfo}>
            <h2 className={styles.username}>{user.username}</h2>
            <div className={styles.joinDate}>
              <CalendarIcon />
              <span>Joined {formatJoinDate(user.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.buttonGrid}>
          <Link href="/notes" className={`${styles.button} ${styles.buttonOutline}`}>
            <FileTextIcon />
            Notes
          </Link>

          <Link href="/settings" className={`${styles.button} ${styles.buttonOutline}`}>
            <EditIcon />
            Edit Profile
          </Link>
        </div>

        <hr className={styles.separator} />

        <form action={logout}>
          <button className={`${styles.button} ${styles.buttonDestructive}`}>
            <LogOutIcon />
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}
