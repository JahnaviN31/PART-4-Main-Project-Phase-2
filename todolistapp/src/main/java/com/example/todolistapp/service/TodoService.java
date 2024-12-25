package com.example.todolistapp.service;

import com.example.todolistapp.model.Todo;
import com.example.todolistapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(String id) {
        return todoRepository.findById(id);
    }

    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteTodoById(String id) {
        todoRepository.deleteById(id);
    }
}
