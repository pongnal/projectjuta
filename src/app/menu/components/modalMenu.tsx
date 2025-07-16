import { Card, Flex, Text, RadioGroup, TextField, Button, Separator } from "@radix-ui/themes";
import { Checkbox } from "@radix-ui/themes";
import { useState } from "react";
import React from "react";
import { colors } from "@/app/components/theme/color";

function ChoiceCard({
  title,
  value,
  onValueChange,
  options
}: {
  title: string,
  value: string,
  onValueChange: (val: string) => void,
  options: { value: string, label: string, extra?: string }[]
}) {
  const isComplete = !!value;
  const cardBg = isComplete ? `bg-[${colors.jade.soft}] border-[${colors.jade.primary}]` : `bg-[${colors.red.soft}] border-[${colors.red.primary}]`;
  const badgeText = isComplete ? 'Complete' : 'Required';
  const badgeClass = isComplete ? `bg-[${colors.jade.primary}] text-white` : `bg-[${colors.red.primary}] text-white`;
  return (
    //UI for customization card
    <Card className={`p-4 border-2 ${cardBg}`}>
      <Flex direction="column" gap="2">
        <Flex align="center" justify="between">
          <Text weight="bold">{title}</Text>
          <span className={`rounded-full px-4 py-0.5 text-[13px] font-semibold ${badgeClass}`}>{badgeText}</span>
        </Flex>
        <Text size="2" color="gray">Select 1</Text>
        <RadioGroup.Root value={value} onValueChange={onValueChange}>
          <Flex direction="column" gap="2">
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex justify-between items-center"
              >
                <RadioGroup.Item value={opt.value} className="flex-grow">
                  <Flex align="center" gap="2">
                    <Text>{opt.label}</Text>
                  </Flex>
                </RadioGroup.Item>
                {opt.extra && (
                  <Text size="2" color="gray" className="ml-4">
                    {opt.extra}
                  </Text>
                )}
              </div>
            ))}
          </Flex>
        </RadioGroup.Root>
      </Flex>
    </Card>
  );
}

export default function ModalMenu({ item, onClose }: { item: any, onClose?: () => void }) {
  // --- LOGIC & STATE ---
  const [customValues, setCustomValues] = useState(() => (item.customizations || []).map(() => ""));
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const price = parseFloat(item.price);
  const optionalBadgeClass = `bg-[${colors.mauve.soft}] text-[${colors.mauve.text}]`;

  // Calculate extra price for size
  let extra = 0;
  (item.customizations || []).forEach((custom: any, idx: number) => {
    const val = customValues[idx];
    const opt = custom.options.find((o: any) => o.value === val);
    if (opt && opt.extra) {
      const match = opt.extra.match(/([\d.]+)/);
      if (match) extra += parseFloat(match[1]);
    }
  });

  // Calculate add-on price
  let addonPrice = 0;
  if (item.addons && item.addons.length > 0 && selectedAddons.length > 0) {
    addonPrice = item.addons[0].options
      .filter((o: any) => selectedAddons.includes(o.value))
      .reduce((sum: number, o: any) => sum + (o.addOnPrice || 0), 0);
  }

  // Calculate total
  const total = price + extra + addonPrice;

  // Check if all required customizations are selected
  const allRequiredSelected = (item.customizations || []).every(
    (custom: any, idx: number) => !custom.required || !!customValues[idx]
  );

  // --- RETURN UI ---
  return (
    <Flex direction="column" gap="4" style={{ width: "100%", position: 'relative' }}>
      {/* X Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 bg-transparent rounded-full p-1"
          type="button"
        >
          <span className="text-2xl font-bold text-gray-500">×</span>
        </button>
      )}
      {/* Image, Title, Price */}
      <img src={item.img} alt={item.title} style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 12 }} />
      <Flex align="center" justify="between">
        <Text size="5" weight="bold">{item.title}</Text>
        <Text size="5" weight="bold">RM{parseFloat(item.price).toFixed(2)}</Text>
      </Flex>
      <Separator my="2" />
      {/* Render all customizations dynamically */}
      {(item.customizations || []).map((custom: any, idx: number) => (
        <ChoiceCard
          key={custom.title}
          title={custom.title}
          value={customValues[idx]}
          onValueChange={val => setCustomValues((vals: string[]) => vals.map((v: string, i: number) => i === idx ? val : v))}
          options={custom.options}
        />
      ))}
      {/* Add Ons Card (optional) */}
      {item.addons && item.addons.length > 0 && (
        <Card className="p-4">
          <Flex direction="column" gap="2">
            <Flex align="center" justify="between">
              <Text weight="bold">Add Ons</Text>
              <span className={`rounded-full px-4 py-0.5 text-[13px] font-semibold ${optionalBadgeClass}`}>Optional</span>
            </Flex>
            <Flex direction="column" gap="2">
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
            </Flex>
          </Flex>
        </Card>
      )}
      {/* Special Instructions Card */}
      <Card className="p-4">
        <Flex direction="column" gap="2">
          <Flex align="center" justify="between">
            <Text weight="bold">Special instructions</Text>
            <span className={`rounded-full px-4 py-0.5 text-[13px] font-semibold ${optionalBadgeClass}`}>Optional</span>
          </Flex>
          <TextField.Root
            placeholder="E.g. No onions please"
            value={instructions}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstructions(e.target.value)}
          />
        </Flex>
      </Card>
      {/* Quantity and Add to Cart */}
      <Flex align="center" gap="3" justify="center">
        <Button variant="soft" onClick={() => setQty(q => Math.max(1, q - 1))}>-</Button>
        <Text size="4">{qty}</Text>
        <Button variant="soft" onClick={() => setQty(q => q + 1)}>+</Button>
      </Flex>
      <Button
        style={{ 
          width: "100%",
          backgroundColor: allRequiredSelected ? colors.jade.primary : undefined,
          color: allRequiredSelected ? "white" : undefined
        }}
        disabled={!allRequiredSelected}
      >
        Add to Basket - RM{(total * qty).toFixed(2)}
      </Button>
    </Flex>
  );
}
