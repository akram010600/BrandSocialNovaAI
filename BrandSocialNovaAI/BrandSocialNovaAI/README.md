# BrandSocialNovaAI

منصة لإدارة محتوى السوشيال ميديا للبراندات — إنشاء منشورات (يدويًا أو بمساعدة AI)، ومتابعة أداءها من خلال لوحة تحليلات.

## المكونات
- **Backend**: FastAPI + SQLite (عن طريق SQLAlchemy) — API لإدارة المنشورات، توليد محتوى، وتحليلات.
- **Frontend**: React + Vite — لوحة تحكم، صفحة إنشاء منشور، صفحة تحليلات.

## تشغيل الباك إند
```bash
cd backend/api
python -m venv venv
source venv/bin/activate   # على ويندوز: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
هيشتغل على: http://localhost:8000
هتلاقي التوثيق التلقائي (Swagger) على: http://localhost:8000/docs

## تشغيل الفرونت إند
```bash
cd frontend
npm install
npm run dev
```
هيشتغل على: http://localhost:5173

## ملاحظة عن التوليد بالذكاء الاصطناعي
دلوقتي `/api/generate` بيرجع محتوى تجريبي (Placeholder) عشان تقدر تشغل المشروع فورًا من غير ما تحتاج مفتاح API.
عشان توصله بذكاء اصطناعي حقيقي (زي OpenAI أو Claude API)، افتح `backend/api/main.py` ودور على دالة `generate_content` واستبدل المنطق فيها باستدعاء API الموديل اللي هتستخدمه.

## إزاي أرفعه على GitHub
```bash
cd BrandSocialNovaAI
git init
git add .
git commit -m "Initial commit: BrandSocialNovaAI"
git remote add origin <رابط الريبو بتاعك>
git push -u origin main
```
