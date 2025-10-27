# Employee App – Azure + GitHub Actions (React + Spring Boot + Azure SQL)

Minimal full-stack example:
- **Frontend**: React (Vite) with Axios
- **Backend**: Spring Boot (Java 17), Spring Web, Spring Data JPA, SQL Server driver
- **DB**: Azure SQL (Database: `EmployeeDB`, Table: `emp(empId, empName)`)
- **Deploy**: Azure App Service (backend) + Azure Static Web Apps (frontend)
- **CI/CD**: GitHub Actions workflows in `.github/workflows/`

---

## 1) Azure SQL – Quick Setup

Run this once on your Azure SQL (via Query editor or SSMS) to create the table:

```sql
CREATE TABLE emp (
  empId INT PRIMARY KEY IDENTITY(1,1),
  empName VARCHAR(100) NOT NULL
);
```

> Database name: **EmployeeDB**

---

## 2) Backend – Spring Boot

Configure these **Application Settings** in your Azure Web App (Backend) or as environment variables when running locally:

- `AZURE_SQL_URL` example:
  `jdbc:sqlserver://<server>.database.windows.net:1433;database=EmployeeDB;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;`
- `AZURE_SQL_USERNAME`
- `AZURE_SQL_PASSWORD`
- (optional) `PORT` for container scenarios; App Service sets `PORT`/`WEBSITES_PORT` automatically.

Local run:
```bash
cd backend
./mvnw spring-boot:run
```

Default port: `8080`

Test:
```bash
curl http://localhost:8080/api/employees
```

---

## 3) Frontend – React (Vite)

Configure API base URL via env var:
- `REACT_APP_API_BASE` e.g. `https://<your-backend>.azurewebsites.net`

Local run:
```bash
cd frontend
npm install
npm run dev
```

Build:
```bash
npm run build
```

---

## 4) GitHub Actions – Secrets to Add

In your GitHub repo → **Settings → Secrets and variables → Actions** add:

- `AZURE_BACKEND_PUBLISH_PROFILE` → from Azure Web App (Backend) → **Get publish profile**
- `AZURE_STATIC_WEB_APPS_API_TOKEN` → from Azure Static Web App → **Deployment token**

---

## 5) Deploy

Push to `main`. The workflows deploy automatically:
- Backend: Azure Web App (JAR)
- Frontend: Azure Static Web Apps

---

## 6) Frontend usage

Open the app in your browser. To add an employee, type a name and click **Add Employee**.
The list below shows existing employees from Azure SQL via the backend API.

---

## Notes

- CORS is enabled for all origins in this demo. For production, restrict to your frontend domain.
- The backend uses `spring.jpa.hibernate.ddl-auto=update` for convenience.
- API endpoints:
  - `GET /api/employees` → list
  - `POST /api/employees` → add `{ "empName": "Alice" }`
