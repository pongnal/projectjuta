import React from 'react'

const button = () => {
  return (
    <div>button</div>
  )
}

export default button

{/* <Flex direction="column" gap="2">
{item.addons[0].options.map((opt: any) => (
    <Flex key={opt.value} align="center" justify="between" className="w-full">
      <Flex align="center" gap="2" className="flex-grow">
        <Checkbox
          checked={selectedAddons.includes(opt.value)}
          onCheckedChange={(checked: boolean) => {
            setSelectedAddons(prev =>
              checked
                ? [...prev, opt.value]
                : prev.filter(v => v !== opt.value)
            );
          }}
        />
        <Text size="2">{opt.label}</Text>
      </Flex>
      <Text size="2" color="gray">+ RM{opt.addOnPrice.toFixed(2)}</Text>
    </Flex>
))}
</Flex> */}