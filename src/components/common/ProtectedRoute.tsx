import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/navigation';

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
	const { isAuthenticated, user, isLoading } = useAuth();
	const location = useLocation();

	// Если ещё загружается, показываем загрузку
	if (isLoading) {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}>
				Загрузка...
			</div>
		);
	}

	if (!isAuthenticated) {
		console.log('ProtectedRoute: Not authenticated, redirecting to login');
		// Перенаправляем на страницу входа, сохраняя текущий путь
		return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
	}

	if (requiredRole === 'admin' && user?.role !== 'admin') {
		console.log('ProtectedRoute: User is not admin, redirecting to home');
		// Если требуется роль админа, но у пользователя её нет
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute; 