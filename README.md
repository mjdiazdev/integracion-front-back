Proyecto ejemplo: Integración Vue 3 (Vite) + Express + Sequelize (MySQL)
------------------------------------------------------------
Contenido del ZIP:
- backend/: código del servidor Express + Sequelize
- frontend/: aplicación Vue 3 + Vite
- create_db.sql: script para crear la base de datos y tabla de ejemplo

Instrucciones:
1) Database:
   - Edita backend/.env.example -> crea backend/.env con tus credenciales MySQL
   - Ejecuta el script create_db.sql en tu servidor MySQL (por ejemplo con `mysql -u root -p < create_db.sql`)

2) Backend:
   cd backend
   npm install
   cp .env.example .env
   (editar .env)
   npm run dev

3) Frontend:
   cd frontend
   npm install
   cp .env.example .env  # opcional
   npm run dev

Nota:
- Asegúrate que el backend esté en el puerto indicado (.env PORT=3000) y que VITE_API_BASE_URL apunte a http://localhost:3000
