package main

import (
	"log"

	"todo-service/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()
	app.Get("/todos", handlers.GetTodos)
	app.Post("/todos", handlers.CreateTodo)
	app.Patch("/todos/:id/toggle", handlers.ToggleTodo)

	log.Fatal(app.Listen(":3000"))
}
