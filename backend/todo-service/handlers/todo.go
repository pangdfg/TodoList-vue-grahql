package handlers

import (
	"net/http"
	"strconv"
	"todo-service/database"
	"todo-service/models"

	"github.com/gofiber/fiber/v2"
)

func GetTodos(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Query("userId"))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var todos []models.Todo
	if err := database.DB.Where("user_id = ?", userID).Find(&todos).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	return c.JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	var todo models.Todo
	if err := c.BodyParser(&todo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := database.DB.Create(&todo).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create todo"})
	}

	return c.Status(http.StatusCreated).JSON(todo)
}

func ToggleTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo

	if err := database.DB.First(&todo, id).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	todo.Checked = !todo.Checked
	if err := database.DB.Save(&todo).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	return c.JSON(todo)
}
