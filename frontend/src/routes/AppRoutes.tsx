import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { NewPredictionPage } from "../pages/NewPredictionPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PredictionHistoryPage } from "../pages/PredictionHistoryPage";
import { ProfilePage } from "../pages/ProfilePage";
import { RegisterPage } from "../pages/RegisterPage";
import { ReportsPage } from "../pages/ReportsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/predict" element={<NewPredictionPage />} />
        <Route path="/history" element={<PredictionHistoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
