"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedButtonProps {
	className: string;
	handleClick: () => void;
}

const AnimatedButton = ({ className, handleClick }: AnimatedButtonProps) => {
	const controls = useAnimation();
	const [isMounted, setIsMounted] = useState(false); // Add a state to track component mount status
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	// Define the animation variants
	const variants = {
		initial: { y: -100, opacity: 0 },
		animate: { y: 0, opacity: 1 },
	};

	// Define the transition for a smoother animation
	const transition = {
		type: "spring", // Change to 'tween' for a linear transition
		damping: 10, // Adjust the damping for the spring effect (higher value = less bounce)
		stiffness: 100, // Adjust the stiffness for the spring effect (higher value = more bounce)
		duration: 0.2,
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// If button is in view, start the animation
						setIsMounted(true);
					} else {
						// If button is not in view, reset the animation
						setIsMounted(false);
					}
				});
			},
			{ threshold: 0.5 }, // Adjust the threshold as needed (0.5 means at least 50% of the button should be in view)
		);

		if (buttonRef.current) {
			observer.observe(buttonRef.current);
		}

		// Clean up the observer when the component is unmounted
		return () => {
			if (buttonRef.current) {
				observer.unobserve(buttonRef.current);
			}
		};
	}, []);

	useEffect(() => {
		// Start the animation only when the component has mounted
		if (isMounted) {
			controls.start("animate");
		}
	}, [controls, isMounted]);

	return (
		<motion.button
			type='button'
			ref={buttonRef}
			onClick={handleClick}
			className={className}
			initial='initial'
			animate={controls} // Use the controls from useAnimation()
			variants={variants}
			transition={transition}
			whileHover={{ scale: 1.1 }} // Add a hover effect to the button
		>
			Get Started
		</motion.button>
	);
};

export default AnimatedButton;
