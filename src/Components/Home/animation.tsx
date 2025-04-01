"use client";

import { motion, MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming `cn` is a utility for classnames

type Direction = "up" | "down" | "left" | "right";

export const FadeIn = ({
    children,
    delay = 0,
    direction,
    fullWidth = false,
    padding = true,
    className = "",
    ...rest
}: {
    children: ReactNode;
    delay?: number;
    direction?: Direction;
    fullWidth?: boolean;
    padding?: boolean;
    className?: string;
} & MotionProps) => {
    const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
    const transition = { duration: 0.5, ease: "easeInOut", delay };

    if (direction === "up") initial.y = 40;
    else if (direction === "down") initial.y = -40;
    else if (direction === "left") initial.x = 40;
    else if (direction === "right") initial.x = -40;

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={transition}
            className={cn({ "w-full": fullWidth, "py-4": padding }, className)}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export const ScaleIn = ({
    children,
    delay = 0,
    className = "",
    ...rest
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
} & MotionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
        className={className}
        {...rest}
    >
        {children}
    </motion.div>
);

export const SlideUp = ({
    children,
    delay = 0,
    className = "",
    ...rest
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
} & MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
        className={className}
        {...rest}
    >
        {children}
    </motion.div>
);

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export const StaggerContainer = ({
    children,
    className = "",
    ...rest
}: {
    children: ReactNode;
    className?: string;
} & MotionProps) => (
    <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className={className}
        {...rest}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({
    children,
    className = "",
    ...rest
}: {
    children: ReactNode;
    className?: string;
} & MotionProps) => (
    <motion.div variants={staggerItem} className={className} {...rest}>
        {children}
    </motion.div>
);
