# User Endpoints

## 1. **POST** `/signup`
**Description**: Registers a new user.  
**Data Requirements**:
- **name** (string): minimum 3 characters  
- **email** (string): must be valid email  
- **password** (string): minimum 5 characters  
- **country** (string): minimum 3 characters  

**Response Codes**:
- **201**: User created successfully  
- **400**: User already exists  
- **422**: Validation errors (e.g., invalid name/email/password)  
- **500**: Internal server error  

---

## 2. **POST** `/login`
**Description**: Logs in a user.  
**Data Requirements**:
- **email** (string): must be valid email  
- **password** (string): minimum 5 characters  

**Response Codes**:
- **200**: Login successful  
- **400**: Invalid credentials  
- **422**: Validation errors  
- **500**: Internal server error  

---

## 3. **GET** `/logout`
**Description**: Logs out a user by invalidating the token.  
**Response Codes**:
- **200**: Logout successful  
- **401**: Unauthorized or token issues  
- **500**: Internal server error



## Project Endpoints

### 1. **POST** `/create`
**Description**: Creates a new project.  
**Data Requirements**:
- **title** (string): Must be at least 1 character long

**Response Codes**:
- **201**: Project created successfully  
- **422**: Validation errors (e.g., invalid/missing title)  
- **401**: Unauthorized (if user is not logged in)  
- **500**: Internal server error  

---

### 2. **GET** `/getAllProject`
**Description**: Retrieves all projects belonging to the logged-in user.  
**Response Codes**:
- **200**: Returns a list of projects  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 3. **GET** `/getProject/:projectId`
**Description**: Retrieves a specific project by its ID.  
**Route Params**:
- **projectId** (string): Valid Project ID  

**Response Codes**:
- **200**: Returns the requested project  
- **404**: Project not found  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 4. **DELETE** `/deleteProject/:projectId`
**Description**: Deletes a project by its ID, and all associated tasks.  
**Route Params**:
- **projectId** (string): Valid Project ID  

**Response Codes**:
- **200**: Project deleted successfully  
- **404**: Project not found  
- **401**: Unauthorized  
- **500**: Internal server error  





## Task Endpoints

### 1. **POST** `/create`
**Description**: Creates a new task.  
**Data Requirements**:
- **title** (string): min 1 character  
- **description** (string): min 20 characters  
- **projectId** (string): must be a valid Project ID  
**Response Codes**:
- **201**: Task successfully created  
- **422**: Validation errors (e.g., missing or invalid fields)  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 2. **GET** `/getAllTask`
**Description**: Retrieves all tasks for the logged-in user.  
**Response Codes**:
- **200**: Returns a list of tasks  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 3. **GET** `/getTask/:taskId`
**Description**: Retrieves a specific task by its ID.  
**Route Params**:
- **taskId** (string): valid Task ID  
**Response Codes**:
- **200**: Returns the requested task  
- **404**: Task not found  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 4. **GET** `/getAlltaskByProject/:projectId`
**Description**: Retrieves all tasks associated with a specific project.  
**Route Params**:
- **projectId** (string): valid Project ID  
**Response Codes**:
- **200**: Returns a list of tasks for the project  
- **404**: Project not found  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 5. **DELETE** `/deleteTask/:taskId`
**Description**: Deletes a task by its ID.  
**Route Params**:
- **taskId** (string): valid Task ID  
**Response Codes**:
- **200**: Task deleted successfully  
- **404**: Task not found  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 6. **PUT** `/updateTask/:taskId`
**Description**: Updates task details.  
**Route Params**:
- **taskId** (string): valid Task ID  
**Data Requirements** (optional but validated if present):
- **title** (string): min 1 character  
- **description** (string): min 20 characters  
- **projectId** (string): valid Project ID  
- **status** (string): one of “pending”, “in-progress”, “completed”  
**Response Codes**:
- **200**: Task updated  
- **404**: Task or project not found  
- **422**: Validation errors  
- **401**: Unauthorized  
- **500**: Internal server error  

---

### 7. **PUT** `/updateTaskStatus/:taskId`
**Description**: Updates only the task status.  
**Route Params**:
- **taskId** (string): valid Task ID  
**Data Requirements**:
- **status** (string): one of “pending”, “in-progress”, “completed”  
**Response Codes**:
- **200**: Task status updated  
- **404**: Task not found  
- **422**: Validation error  
- **401**: Unauthorized  
- **500**: Internal server error
