package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title   string `json:"title"`
	Checked bool   `json:"checked"`
	UserId  uint   `json:"userid" gorm:"column:user_id"` 
}
