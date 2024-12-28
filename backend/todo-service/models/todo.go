package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username     string `gorm:"unique;not null" json:"username"`
	Password     string `gorm:"not null" json:"password"`
	ProfileImage string `json:"profile_image"`
	Todos        []Todo `gorm:"foreignKey:UserId"` 
}

type Todo struct {
	gorm.Model
	Title   string `json:"title"`
	Checked bool   `json:"checked"`
	UserId  uint   `json:"userid"` 
	User    User   `gorm:"foreignKey:UserId"` 
}
