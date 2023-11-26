import useSWR, { mutate } from "swr"
import "./App.css"
import { Box, List, MantineProvider, ThemeIcon } from "@mantine/core"
import AddTodo from "./components/AddTodo"
import { CheckCircleFillIcon } from "@primer/octicons-react"

export interface Todo {
  id: number
  title: string
  body: string
  done: false
}

export const ENDPOINT = "http://localhost:4000"

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json())

const markTodoAsDone = async (id: number) => {
  const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
    method: "PATCH",
  }).then((res) => res.json())

  mutate(updated)
}

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher)

  return (
    <MantineProvider>
      <Box my="xl">
        <List spacing="xs" size="sm" mb={12} center>
          {data?.map((todo) => {
            return (
              <List.Item
                onClick={() => markTodoAsDone(todo.id)}
                key={`todo_list_${todo.id}`}
                icon={
                  todo.done ? (
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  ) : (
                    <ThemeIcon color="gray" size={24} radius="xl">
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  )
                }
              >
                {todo.title}
              </List.Item>
            )
          })}
        </List>

        <AddTodo mutate={mutate} />
      </Box>
    </MantineProvider>
  )
}

export default App
