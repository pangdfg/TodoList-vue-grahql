package handlers

import (
	"net/http"
	"todo-service/database"
	"todo-service/models"

	"github.com/gofiber/fiber/v2"
)

func GetTodos(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	
	var todos []models.Todo
	if err := database.DB.Where("user_id = ?", userID).Find(&todos).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to fetch todos"})
	}

	if len(todos) == 0 {
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"status": http.StatusOK,
			"todos": []models.Todo{},
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"todos": todos,
	})
}

func GetTodosById(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo

	if err := database.DB.First(&todo, id).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "Todo not found"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"id": todo.ID,
		"title": todo.Title,
		"checked": todo.Checked,
		"userId": todo.UserID,
	})
}

func CreateTodo(c *fiber.Ctx) error {
	userID, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid user ID"})
	}

	var todo models.Todo
	if err := c.BodyParser(&todo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid request body"})
	}

	todo.UserID = userID
	if err := database.DB.Create(&todo).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to create todo"})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"status": http.StatusCreated,
		"id": todo.ID,
		"title": todo.Title,
		"checked": todo.Checked,
		"userId": todo.UserID,
	})
}

func EditTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo

	if err := database.DB.First(&todo, id).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "Todo not found"})
	}

	if err := c.BodyParser(&todo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid request body"})
	}

	if err := database.DB.Save(&todo).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to update todo"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"id": todo.ID,
		"title": todo.Title,
		"checked": todo.Checked,
		"userId": todo.UserID,
	})
}
