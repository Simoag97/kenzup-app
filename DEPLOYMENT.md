# Kenz'up Deployment Guide - Vercel (FREE)

## 🚀 Quick Deployment (5 Minutes)

### **Step 1: Install Vercel CLI**
```powershell
npm install -g vercel
```

### **Step 2: Login to Vercel**
```powershell
vercel login
```
- Choose "Continue with GitHub" or "Continue with Email"
- Follow the prompts

### **Step 3: Deploy Backend**
```powershell
cd c:\Users\hamza\.gemini\antigravity\playground\primordial-aphelion\backend
vercel
```

**When prompted:**
- "Set up and deploy?" → **Y**
- "Which scope?" → Choose your account
- "Link to existing project?" → **N**
- "Project name?" → `kenzup-backend` (or any name)
- "Directory?" → Press Enter (current directory)
- "Override settings?" → **N**

**Copy the deployment URL** (e.g., `https://kenzup-backend.vercel.app`)

### **Step 4: Add Environment Variables**
```powershell
vercel env add MONGODB_URI
```
Paste: `mongodb+srv://simoaglaou0_db_user:BURbRKph5NppIsKM@cluster0.zixukd6.mongodb.net/kenzup`

```powershell
vercel env add JWT_SECRET
```
Paste: `your-super-secret-jwt-key-12345`

```powershell
vercel env add JWT_EXPIRE
```
Paste: `7d`

### **Step 5: Redeploy Backend**
```powershell
vercel --prod
```

### **Step 6: Deploy Frontend**
```powershell
cd c:\Users\hamza\.gemini\antigravity\playground\primordial-aphelion
vercel
```

**When prompted:**
- "Set up and deploy?" → **Y**
- "Project name?" → `kenzup-app`
- "Directory?" → Press Enter
- "Override settings?" → **Y**
  - "Build Command?" → `npm run build`
  - "Output Directory?" → `dist`
  - "Development Command?" → `npm run dev`

### **Step 7: Add Frontend Environment Variable**
```powershell
vercel env add VITE_API_URL
```
Paste your backend URL: `https://kenzup-backend.vercel.app/api`

### **Step 8: Deploy Frontend to Production**
```powershell
vercel --prod
```

## ✅ Done!

Your app is now live at:
- **Frontend:** `https://kenzup-app.vercel.app`
- **Backend:** `https://kenzup-backend.vercel.app`

## 📱 Test Your Live App:
1. Open the frontend URL on your phone
2. Register a shop owner account
3. Login as driver (driver1@company.com / driver123)
4. Generate QR code
5. Scan with shop owner!

## 🔄 Update Your App:
Whenever you make changes:
```powershell
vercel --prod
```

That's it! Your app is online! 🎉
