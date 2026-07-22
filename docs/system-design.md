# HeartGuard System Design

## Purpose

This document describes the system design for HeartGuard, including the system architecture, Firebase Firestore database design, UML-style diagrams, and interface wireframes.

HeartGuard is a heart disease risk prediction system that uses a React frontend, Firebase services, a Python FastAPI backend, and a saved Scikit-learn machine-learning pipeline.

## Technology Stack

| Layer              | Technology                            |
| ------------------ | ------------------------------------- |
| Frontend           | React, TypeScript, Vite, Tailwind CSS |
| Routing            | React Router                          |
| Charts             | Recharts                              |
| Icons              | Lucide React                          |
| Authentication     | Firebase Authentication               |
| Database           | Firebase Firestore                    |
| Backend API        | Python, FastAPI                       |
| ML Model           | Scikit-learn, joblib                  |
| Hosting            | Firebase Hosting                      |
| Backend Deployment | Free-friendly Python hosting option   |
| Version Control    | Git and GitHub                        |

## System Architecture

HeartGuard uses a client-server architecture with a separately served Python machine-learning backend.

```text
React Frontend
        |
        | Firebase Authentication
        v
Firebase Auth
        |
        | Firebase ID token
        v
FastAPI Backend
        |
        | Firebase Admin SDK token verification
        v
Prediction Service
        |
        | Loads saved ML pipeline
        v
Scikit-learn Model Pipeline
        |
        | Prediction result
        v
Firestore Database
```
