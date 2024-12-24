package main

import (
	"log"
	"user-service/database"
	"user-service/handlers"
	"user-service/models"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Connect()
	database.DB.AutoMigrate(&models.User{})

	app := fiber.New()

	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)
	app.Get("/profile", handlers.GetProfile)

	log.Fatal(app.Listen(":3000"))
}
