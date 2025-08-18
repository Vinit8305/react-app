# 🚀 Quick Start Guide - Get Token and Add Data

## Step 1: Register Your First Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

## Step 2: Login to Get Your Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```
**Response will include:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-token-here"
}
```

## Step 3: Use Token to Add Skills
Replace `YOUR_TOKEN` with the actual token from Step 2:

```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"skillName":"React","percentage":90,"category":"FRONT END"}'
```

## 📋 Complete Commands in Order

### 1. Start Server
```bash
cd backend && npm start
```

### 2. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### 3. Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### 4. Add Your First Skill
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"skillName":"React","percentage":90,"category":"FRONT END"}'
```

## 🎯 Postman Setup
1. **Register:** POST `http://localhost:5000/api/auth/register`
2. **Login:** POST `http://localhost:5000/api/auth/login`
3. **Copy token** from login response
4. **Add skill:** POST `http://localhost:5000/api/skills`
   - Header: `Authorization: Bearer YOUR_TOKEN`
   - Body: `{"skillName":"React","percentage":90,"category":"FRONT END"}`

## ✅ Ready-to-Use Sample Data
After getting your token, add these skills:

```bash
# Frontend Skills
curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skillName":"React.js","percentage":90,"category":"FRONT END"}'

curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skillName":"JavaScript","percentage":95,"category":"FRONT END"}'

# Backend Skills
curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skillName":"Node.js","percentage":85,"category":"BACK END"}'

# Database Skills
curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"skillName":"MongoDB","percentage":80,"category":"DATABASE"}'
