package main

import (
	"log"

	"todo-service/database"
	"todo-service/handlers"
	"todo-service/middleware"
	"todo-service/models"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	
	database.Connect()
	database.DB.AutoMigrate(&models.Todo{})

	app := fiber.New()
	app.Use(middleware.JwtVerify)
	app.Get("/todos",handlers.GetTodos)
	app.Get("/todos/:id" ,handlers.GetTodosById)
	app.Post("/todos" ,handlers.CreateTodo)
	app.Patch("/todos/:id/edit" ,handlers.EditTodo)

	log.Fatal(app.Listen(":8081"))
}
