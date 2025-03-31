"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export const FadeIn = ({
    children,
    delay = 0,
    direction = null,
    fullWidth = false,
    padding = true,
    className = "",
}: {
    children: ReactNode
    delay?: number
    direction?: "up" | "down" | "left" | "right" | null
    fullWidth?: boolean
    padding?: boolean
    className?: string
}) => {
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 }
    const transition = { duration: 0.5, ease: "easeInOut", delay }

    if (direction === "up") {
        initial.y = 40
    } else if (direction === "down") {
        initial.y = -40
    } else if (direction === "left") {
        initial.x = 40
    } else if (direction === "right") {
        initial.x = -40
    }

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={transition}
            className={`${fullWidth ? "w-full" : ""} ${padding ? "py-4" : ""} ${className}`}
        >
            {children}
        </motion.div>
    )
}

export const ScaleIn = ({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode
    delay?: number
    className?: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const SlideUp = ({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode
    delay?: number
    className?: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

export const StaggerContainer = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className={className}>
            {children}
        </motion.div>
    )
}

export const StaggerItem = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    )
}
