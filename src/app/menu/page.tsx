"use client";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { menuItems } from "./menuData";
import { useEffect, useState, useRef } from "react";

const categories = [
  { key: "fastFood", label: "Fast Food" },
  { key: "dessert", label: "Dessert" },
  { key: "anekanasi", label: "Aneka Nasi" },
  { key: "drink", label: "Drink" },
  { key: "massage", label: "Massage" },
];

export default function Menu() {
  const [columns, setColumns] = useState(3);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const TAB_BAR_HEIGHT = 64;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) setColumns(1);
      else if (window.innerWidth <= 900) setColumns(2);
      else setColumns(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (key: string) => {
    const ref = sectionRefs.current[key];
    if (ref) {
      const y = ref.getBoundingClientRect().top + window.scrollY - TAB_BAR_HEIGHT - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Flex direction="column" className="w-full max-w-[1200px] mx-auto p-6">
      {/* Sticky, horizontally scrollable tab bar */}
      <div className="sticky top-0 z-10 bg-white pb-4 mb-4 h-16">
        <div className="flex overflow-x-auto gap-3 py-3 border-b border-gray-200">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              onClick={() => handleTabClick(cat.key)}
              variant="soft"
              className="min-w-[100px] font-semibold text-base whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Category sections */}
      {categories.map((cat) => (
        <div
          key={cat.key}
          ref={el => { sectionRefs.current[cat.key] = el; }}
          className="mb-10"
          style={{ scrollMarginTop: TAB_BAR_HEIGHT + 16 }}
        >
          <Text as="div" size="5" weight="bold" mb="5" className="mb-5">{cat.label}</Text>
          <div
            className={
              columns === 1
                ? "grid grid-cols-1 gap-4 w-full"
                : columns === 2
                ? "grid grid-cols-2 gap-4 w-full"
                : "grid grid-cols-3 gap-4 w-full"
            }
          >
            {menuItems.filter(item => item.category === cat.key).map((item) => (
              <Card key={item.title} className="h-full flex flex-col justify-center p-6">
                <Flex align="start" gap="4">
                  <img src={item.img} alt={item.title} className="w-[100px] h-[100px] object-contain rounded-2xl" />
                  <Flex direction="column" className="flex-1">
                    <Text as="div" size="4" weight="bold" mb="1">{item.title}</Text>
                    <Text size="2" color="gray" mb="3">{item.desc}</Text>
                    <Flex direction="row" align="center" justify="between" className="mt-1">
                      <Text size="4" weight="bold">RM{item.price}</Text>
                      <Button variant="soft" size="3" radius="full">+</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </Flex>
  );
}