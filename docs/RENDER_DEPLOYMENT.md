# Render Deployment Guide

This document explains how to deploy CampusConnect Study Hub on Render.

## Project structure

The repository is a monorepo:

- `backend` - Express API, Prisma, PostgreSQL
- `frontend` - React/Vite frontend

## Backend service

Render service type:

- Web Service

Backend settings:

- Root Directory: `backend`
- Build Command: `npm install && npx prisma generate`
- Start Command: `npm start`

Required backend environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<Neon PostgreSQL connection string>
JWT_SECRET=<secure production secret>
CLIENT_ORIGIN=<frontend Render URL>
