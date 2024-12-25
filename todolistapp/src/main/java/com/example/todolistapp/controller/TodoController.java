package com.example.todolistapp.controller;

import com.example.todolistapp.model.Todo;
import com.example.todolistapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public Optional<Todo> getTodoById(@PathVariable String id) {
        return todoService.getTodoById(id);
    }

    @PostMapping
    public Todo saveTodo(@RequestBody Todo todo) {
        return todoService.saveTodo(todo);
    }

    @PatchMapping("/{id}")
    public Todo updateTodoStatus(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        Optional<Todo> todoOpt = todoService.getTodoById(id);
        if (todoOpt.isPresent()) {
            Todo todo = todoOpt.get();
            if (updates.containsKey("completed")) {
                todo.setCompleted((Boolean) updates.get("completed"));
            }
            return todoService.saveTodo(todo);
        }
        return null; // Handle the case where the TODO item is not found
    }

    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable String id) {
        todoService.deleteTodoById(id);
    }
}
