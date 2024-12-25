package com.example.todolistapp.repository;

import com.example.todolistapp.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {}
