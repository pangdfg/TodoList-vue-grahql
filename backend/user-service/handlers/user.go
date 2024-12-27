package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"user-service/database"
	"user-service/middleware"
	"user-service/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid request body"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to hash password"})
	}
	user.Password = string(hashedPassword)

	if err := database.DB.Create(&user).Error; err != nil {
		log.Printf("Error creating user: %v", err)
		return c.Status(http.StatusConflict).JSON(fiber.Map{"status": http.StatusConflict, "error": "Username already exists"})
	}

	// Ensure user ID is set correctly
	if user.ID == 0 {
		log.Printf("Error: User ID is not set")
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to create user"})
	}

	token, err := middleware.GenerateToken(user.ID)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to generate token"})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"status": http.StatusCreated,
		"token": token,
		"user": fiber.Map{
			"id": user.ID,
			"username": user.Username,
			"profileImage": user.ProfileImage,
		},
	})
}

func Login(c *fiber.Ctx) error {
	var input models.User
	if err := c.BodyParser(&input); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid request body"})
	}

	var user models.User
	if err := database.DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "User not found"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"status": http.StatusUnauthorized, "error": "Invalid credentials"})
	}

	token, err := middleware.GenerateToken(user.ID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to generate token"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"token": token,
		"user": fiber.Map{
			"id": user.ID,
			"username": user.Username,
			"profileImage": user.ProfileImage,
		},
	})
}

func GetProfile(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "User not found"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"id": user.ID,
		"username": user.Username,
		"profileImage": user.ProfileImage,
	})
}

func UpdateProfileImage(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	file, err := c.FormFile("profile_image")
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Failed to upload file"})
	}

	uploadDir := "./uploads"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, os.ModePerm)
	}

	filePath := filepath.Join(uploadDir, fmt.Sprintf("user_%d_%s", userID, file.Filename))
	if err := c.SaveFile(file, filePath); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to save file"})
	}

	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "User not found"})
	}

	user.ProfileImage = filePath
	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to update user profile image"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"message": "Profile image updated successfully",
		"profile_image": filePath,
		"user": fiber.Map{
			"id": user.ID,
			"username": user.Username,
			"profileImage": user.ProfileImage,
		},
	})
}

type UpdateUsernameRequest struct {
	NewUsername string `json:"newUsername" validate:"required"`
}

func UpdateUsername(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)	

	var req UpdateUsernameRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"error": "Invalid request body",
		})
	}

	var existingUser models.User
	if err := database.DB.Where("username = ?", req.NewUsername).First(&existingUser).Error; err == nil {
		return c.Status(http.StatusConflict).JSON(fiber.Map{
			"status": http.StatusConflict,
			"error": "Username is already taken",
		})
	}

	if err := database.DB.Model(&models.User{}).Where("id = ?", userID).Update("username", req.NewUsername).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusInternalServerError,
			"error": "Failed to update username",
		})
	}

	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "User not found"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"message": "Username updated successfully",
		"user": fiber.Map{
			"id": user.ID,
			"username": user.Username,
			"profileImage": user.ProfileImage,
		},
	})
}