"use client";
import {
  Flex,
  Text,
  Button,
  AlertDialog,
  Spinner,
  Callout,
  Dialog,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Themepage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Flex direction="column" gap="2" mt="9" align="center" justify="center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Title>Modal Menu</Dialog.Title>
          <Dialog.Trigger>
            <Button style={{ width: "auto" }} onClick={() => setOpen(true)}>Let's go</Button>
          </Dialog.Trigger>
          <Dialog.Content style={{ maxWidth: 480, width: "100%" }}>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      <Flex direction="column" gap="2" mt="9" align="center" justify="center">
        <Text size="3">Alert Dialog Example:</Text>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button>Revoke access</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure? This application will no longer be accessible and
              any existing sessions will be expired.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>

      <Flex direction="column" justify="center" align="center" mt="9">
        <Text size="3">Variant Button</Text>
        <Flex align="center" gap="2" justify="center">
          <Button variant="classic">Classic</Button>
          <Button variant="solid">Solid</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="surface">Surface</Button>
          <Button loading variant="outline">
            Outline
          </Button>
          <Button disabled variant="classic">
            <Spinner loading></Spinner>
            Loading Classic
          </Button>
        </Flex>
      </Flex>
      <Flex direction="row" gap="2" mt="9" justify="center">
        <Text size="3">Direction: Row</Text>
        <Button>One</Button>
        <Button>Two</Button>
      </Flex>
      <Flex direction="column" gap="2" mt="9" justify="center" align="center">
        <Text size="3">Direction: Column</Text>
        <Button>One</Button>
        <Button>Two</Button>
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Text size="3">Simple Callout</Text>
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            This is the default callout which is the text size by default use
            text size 3, no variant style.
          </Callout.Text>
        </Callout.Root>
      </Flex>
      <Flex
        direction="column"
        gap="3"
        align="center"
        justify="center"
        mt="9"
        mb="9"
      >
        <Text size="3">Variant Callout</Text>
        <Callout.Root variant="soft">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            This is the callout style: variant soft with default text which size
            3.
          </Callout.Text>
        </Callout.Root>

        <Callout.Root variant="surface">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            This is the callout style: variant surface with default text which
            size 3.
          </Callout.Text>
        </Callout.Root>

        <Callout.Root variant="outline">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            This is the callout style: variant outline with default text which
            size 3.
          </Callout.Text>
        </Callout.Root>
        <Callout.Root variant="soft" color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            This is the callout style: variant soft with color red.
            3.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </>
  );
}
