"use client";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { menuItems } from "./menuData";
import { useEffect, useState } from "react";

const categories = [
  { key: "fastFood", label: "Fast Food" },
  { key: "dessert", label: "Dessert" },
];

export default function Menu() {
  const [columns, setColumns] = useState(3);

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

  return (
    <Flex direction="column" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      {categories.map((cat) => (
        <div key={cat.key} style={{ marginBottom: 40 }}>
          <Text as="div" size="5" weight="bold" mb="5">{cat.label}</Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: columns === 1 ? "1fr" : `repeat(${columns}, 1fr)` ,
              gap: 18,
              width: "100%",
            }}
          >
            {menuItems.filter(item => item.category === cat.key).map((item, idx) => (
              <Card key={item.title} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 24 }}>
                <Flex align="start" gap="4">
                  <img src={item.img} alt={item.title} style={{ width: 100, height: 100, objectFit: "contain", borderRadius: 16 }} />
                  <Flex direction="column" style={{ flex: 1 }}>
                    <Text as="div" size="4" weight="bold" mb="1">{item.title}</Text>
                    <Text size="2" color="gray" mb="3">{item.desc}</Text>
                    <Flex direction="row" align="center" justify="between" style={{ marginTop: 2 }}>
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