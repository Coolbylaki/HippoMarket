"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActiveIndex(null);
			}
		};

		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, []);

	const isAnyOpen = activeIndex !== null;

	const navRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(navRef, () => setActiveIndex(null));

	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, index) => {
				const handleOpen = () => {
					if (activeIndex === index) {
						setActiveIndex(null);
					} else {
						setActiveIndex(index);
					}
				};

				const isOpen = index === activeIndex;

				return (
					<NavItem
						key={category.value}
						category={category}
						isOpen={isOpen}
						handleOpen={handleOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
}
