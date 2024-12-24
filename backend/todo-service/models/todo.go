package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title   string `json:"title"`
	Checked bool   `json:"checked"`
	UserID  uint   `json:"user_id"`
}
