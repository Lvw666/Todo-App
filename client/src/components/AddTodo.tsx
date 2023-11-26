import { useState } from "react"
import { useForm } from "@mantine/form"
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core"
import { ENDPOINT, Todo } from "../App"
import { KeyedMutator } from "swr"

const AddTodo = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  })

  const createTodo = async (values: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json())

    mutate(updated)
    form.reset()
    setOpen(false)
  }

  return (
    <div>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("body")}
          />
          <Button type="submit">Create todo</Button>
        </form>
      </Modal>

      <Group>
        <Button
          style={{ width: 1200 }}
          fullWidth
          mb={12}
          onClick={() => setOpen(true)}
        >
          ADD TODO
        </Button>
      </Group>
    </div>
  )
}

export default AddTodo
