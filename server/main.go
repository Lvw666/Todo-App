package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  int    `json:"body"`
}

func main() {
	fmt.Print("Hello world!")

	app := fiber.New()

	//todo := []Todo{}

	app.Get("/start", func(ctx *fiber.Ctx) error {
		return ctx.SendString("OK!!!")
	})

	//app.Post("/api/todo", func(ctx *fiber.Ctx) error {
	//	todo := &todo
	//})

	log.Fatal(app.Listen(":4000"))
}
