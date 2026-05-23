
## Deployment

Deployment planning is documented in:

```text
docs/RENDER_DEPLOYMENT.md
The project is prepared for Render deployment with:

- Backend web service from `backend`
- Frontend static site from `frontend`
- Neon PostgreSQL connection through `DATABASE_URL`
- Frontend/backend connection through `VITE_API_URL` and `CLIENT_ORIGIN`
