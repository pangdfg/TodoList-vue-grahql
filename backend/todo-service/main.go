package main

import (
	"log"

	"todo-service/handlers"
	"todo-service/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()
	app.Get("/todos", middleware.JwtVerify ,handlers.GetTodos)
	app.Post("/todos", middleware.JwtVerify ,handlers.CreateTodo)
	app.Patch("/todos/:id/toggle", middleware.JwtVerify ,handlers.ToggleTodo)

	log.Fatal(app.Listen(":3000"))
}
