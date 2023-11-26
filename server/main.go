package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	fmt.Print("Hello world!")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	var todos []Todo

	app.Get("/start", func(ctx *fiber.Ctx) error {
		return ctx.SendString("OK!!!")
	})

	app.Post("/api/todos", func(ctx *fiber.Ctx) error {
		todo := &Todo{}

		if err := ctx.BodyParser(todo); err != nil {
			return err
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return ctx.JSON(todos)
	})

	app.Patch("/api/todos/:id/done", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")

		if err != nil {
			return ctx.Status(401).SendString("Invalid id")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}

		return ctx.JSON(todos)
	})

	app.Get("/api/todos", func(ctx *fiber.Ctx) error {
		return ctx.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}
