import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/navigation';

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
	const { isAuthenticated, user } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		// Перенаправляем на страницу входа, сохраняя текущий путь
		return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
	}

	if (requiredRole === 'admin' && user?.role !== 'admin') {
		// Если требуется роль админа, но у пользователя её нет
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute; 