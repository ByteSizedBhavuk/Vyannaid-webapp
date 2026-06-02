import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Helper to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GoogleCallback = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Expected query params: token, id, name, email, role
    const token = query.get('token');
    const id = query.get('id');
    const name = query.get('name');
    const email = query.get('email');
    const role = query.get('role');

    if (token && id && name && email && role) {
      // Store user in auth context
      login({ id, name: decodeURIComponent(name), email: decodeURIComponent(email), role, token });
      // Redirect to role‑specific dashboard
      const ROLE_HOME = {
        admin: '/dashboard/admin',
        counsellor: '/dashboard/counsellor',
        student: '/dashboard/student',
      };
      navigate(ROLE_HOME[role] ?? '/', { replace: true });
    } else {
      // Fallback – go to home page if something is missing
      navigate('/', { replace: true });
    }
  }, [query, login, navigate]);

  // Simple UI while processing
  return <div>Processing Google login…</div>;
};

export default GoogleCallback;
