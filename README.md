[![Backend Tests](https://github.com/sleonardoaugusto/veredict/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/sleonardoaugusto/veredict/actions/workflows/backend-tests.yml)

# 🚀 Veredict Project

This is a full-stack project using **Django (backend)**, **Next.js (frontend)**, and **PostgreSQL (database)**. Everything runs inside Docker containers for easy setup.

---

## 📦 **Project Structure**

```
veredict/
├── backend/         # Django App
├── frontend/        # Next.js App
└── compose.yml      # Docker Compose Config
```

---

## ⚙️ **How to Run**

1. **Clone the Repo:**

```bash
git clone https://github.com/your-username/veredict.git
cd veredict
```

2. **Start the App:**

```bash
docker-compose up --build
```

3. **Access the App:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend (API):** [http://localhost:8000](http://localhost:8000)
   - **Database:** PostgreSQL at `localhost:5432`

4. **Stop the App:**

```bash
docker-compose down
```

---

## 📂 **Environment Variables**

- **Backend:** `backend/.env`
- **Frontend:** `frontend/.env.local`

---

## 🔄 **Common Commands**

### **Backend Commands (Django)**
- **Create Migrations:**
  ```bash
  make makemigrations
  ```
- **Run DB Migrations:**
  ```bash
  make migrate
  ```
- **Run Django Shell Plus (with auto-imported models):**
  ```bash
  make shell_plus
  ```
- **SSH into the Backend Container:**
  ```bash
  make ssh-backend
  ```

### **Frontend Commands (Node.js)**
- **Install a Node Package:**
  ```bash
  docker-compose exec frontend npm install <package-name>
  ```
- **SSH into the Frontend Container:**
  ```bash
  make ssh-frontend
  ```

### **General Commands**
- **Install a Python Package inside the Backend Container:**
  ```bash
  docker-compose exec backend pip install <package-name>
  ```

```

---

## 🧪 **Run Tests**

- **Backend (Django):**

```bash
docker-compose exec backend pytest
```

- **Frontend (Next.js):**

```bash
docker-compose exec frontend npm run test
```

---

## 🗑️ **Clean Up**

```bash
docker-compose down -v
```

---

That's it! 🚀 Let me know if you need more details.
# veredict
...