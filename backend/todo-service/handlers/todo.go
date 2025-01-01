package handlers

import (
	"net/http"
	"todo-service/database"
	"todo-service/models"

	"github.com/gofiber/fiber/v2"
)

func userIdFromToken(c *fiber.Ctx) uint {
	id, ok := c.Locals("user_id").(uint)
	if !ok {
		return 0
	}
	return id
}

func GetTodos(c *fiber.Ctx) error {
	userID := userIdFromToken(c)
	
	var todos []models.Todo
	if err := database.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&todos).Error; err != nil {
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
	if todo.UserId != userIdFromToken(c) {
		return c.Status(http.StatusForbidden).JSON(fiber.Map{"status": http.StatusForbidden, "error": "You are not authorized to view this todo"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status": http.StatusOK,
		"id": todo.ID,
		"title": todo.Title,
		"checked": todo.Checked,
		"userId": todo.UserId,
	})
}

func CreateTodo(c *fiber.Ctx) error {
	userID := userIdFromToken(c)

	var todo models.Todo
	if err := c.BodyParser(&todo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"status": http.StatusBadRequest, "error": "Invalid request body"})
	}

	todo.UserId = userID
	if err := database.DB.Create(&todo).Error; err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"status": http.StatusInternalServerError, "error": "Failed to create todo"})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"status": http.StatusCreated,
		"id": todo.ID,
		"title": todo.Title,
		"checked": todo.Checked,
		"userId": todo.UserId,
	})
}

func EditTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	var todo models.Todo

	if err := database.DB.First(&todo, id).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"status": http.StatusNotFound, "error": "Todo not found"})
	}

	if todo.UserId != userIdFromToken(c) {
		return c.Status(http.StatusForbidden).JSON(fiber.Map{"status": http.StatusForbidden, "error": "You are not authorized to edit this todo"})
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
		"userId": todo.UserId,
	})
}
