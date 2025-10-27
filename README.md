# Employee App — Azure AKS via GitHub Actions (OIDC)

This repo contains a minimal full-stack app:
- Frontend: React (Vite), calls `/api`
- Backend: Spring Boot REST API (GET/POST employees)
- DB: MySQL with auto-init `emp(empId, empName)`
- Deploy: Azure AKS using Helm
- CI/CD: GitHub Actions with OIDC (no secrets)
- Ingress: Single IP; `/` → frontend, `/api` → backend

---

## 1) One-time Azure setup

```bash
az group create -n employee-rg -l eastus
az acr create -n employeeacr -g employee-rg --sku Basic
az aks create -n employee-aks -g employee-rg --attach-acr employeeacr --enable-managed-identity
```

## 2) Configure OIDC trust (Windows PowerShell)

Run the script at repo root:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
.\setup-oidc-clean.ps1
```
Copy the output values into your GitHub repo → **Settings → Secrets and variables → Actions → Variables**:
- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## 3) Push to GitHub

Commit/push this repo to the `main` branch. The workflow:
- Authenticates with Azure via OIDC
- Builds and pushes Docker images to ACR
- (If needed) installs ingress-nginx
- Deploys Helm chart to AKS

## 4) Get the app URL

Find the ingress public IP:
```bash
kubectl get svc -n ingress-nginx ingress-nginx-controller
```
Open `http://<EXTERNAL-IP>/`

- UI at `/`
- API proxied at `/api` → backend

## 5) Add an employee

Use the UI to add an employee name. The list will update.
The DB is initialized with sample rows: "John Doe", "Jane Smith".

---

## Notes
- For production, replace MySQL `emptyDir` with a PVC and secure secrets.
- The backend exposes `/api/employees` (GET/POST JSON).
- Frontend uses relative path `/api` so it works behind the same Ingress.
