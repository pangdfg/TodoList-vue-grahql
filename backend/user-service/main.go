package main

import (
	"log"
	"user-service/database"
	"user-service/handlers"
	"user-service/middleware"
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
	app.Get("/profile", middleware.JwtVerify ,handlers.GetProfile)
	app.Put("/username", middleware.JwtVerify ,handlers.UpdateUsername)
	app.Post("/profile/image", middleware.JwtVerify ,handlers.UpdateProfileImage)

	log.Fatal(app.Listen(":3000"))
}
