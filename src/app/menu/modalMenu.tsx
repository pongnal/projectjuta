import { Card, Flex, Text, RadioGroup, TextField, Button, Separator } from "@radix-ui/themes";
import { useState } from "react";

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
  const cardBg = isComplete ? 'bg-[var(--jade-3)] border-[var(--jade-9)]' : 'bg-[var(--red-3)] border-[var(--red-9)]';
  const badgeText = isComplete ? 'Complete' : 'Required';
  const badgeClass = isComplete ? 'bg-[var(--jade-9)] text-white' : 'bg-[var(--red-9)] text-white';
  return (
    <Card className={`p-4 border-2 ${cardBg}`}>
      <Flex direction="column" gap="2">
        <Flex align="center" justify="between">
          <Text weight="bold">{title}</Text>
          <span className={`rounded-full px-4 py-0.5 text-[13px] font-semibold ${badgeClass}`}>{badgeText}</span>
        </Flex>
        <Text size="2" color="gray">Select 1</Text>
        <RadioGroup.Root value={value} onValueChange={onValueChange}>
          <Flex direction="column" gap="2">
            {options.map(opt => (
              <RadioGroup.Item value={opt.value} key={opt.value}>
                <Flex align="center" gap="2">
                  <Text>{opt.label}</Text>
                  {opt.extra && <Text size="2" color="gray">{opt.extra}</Text>}
                </Flex>
              </RadioGroup.Item>
            ))}
          </Flex>
        </RadioGroup.Root>
      </Flex>
    </Card>
  );
}

export default function ModalMenu({ item }: { item: any }) {
  // Dynamically create state for each customization
  const [customValues, setCustomValues] = useState(() =>
    (item.customizations || []).map(() => "")
  );
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState("");
  const price = parseFloat(item.price);
  // Find extra price for size if exists
  let extra = 0;
  const sizeIndex = item.customizations?.findIndex((c: any) => c.title.toLowerCase().includes("size"));
  if (sizeIndex !== undefined && sizeIndex !== -1) {
    const sizeVal = customValues[sizeIndex];
    const sizeOpt = item.customizations[sizeIndex].options.find((o: any) => o.value === sizeVal);
    if (sizeOpt && sizeOpt.extra) {
      const match = sizeOpt.extra.match(/([\d.]+)/);
      if (match) extra = parseFloat(match[1]);
    }
  }
  const total = price + extra;
  const optionalBadgeClass = 'bg-[var(--mauve-3)] text-[var(--mauve-11)]';

  return (
    <Flex direction="column" gap="4" style={{ width: "100%" }}>
      {/* Image, Title, Price */}
      <img src={item.img} alt={item.title} style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 12 }} />
      <Flex align="center" justify="between">
        <Text size="5" weight="bold">{item.title}</Text>
        <Text size="5" weight="bold">RM{total.toFixed(2)}</Text>
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
      <Button style={{ width: "100%" }} disabled>
        Add to Basket - RM{(total * qty).toFixed(2)}
      </Button>
    </Flex>
  );
}