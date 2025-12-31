import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const result = await login(email, password);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage({ type: 'danger', text: result.message });
    }
    setIsLoading(false);
  };

  // إعادة التوجيه إذا كان المستخدم مسجل دخول
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>منصة نخبة</h1>
          <h2>تسجيل الدخول</h2>
          <p>مرحباً بعودتك! سجل دخولك للوصول إلى منصة نخبة</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="example@email.com"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ليس لديك حساب؟{' '}
            <Link to="/register">سجل الآن</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
