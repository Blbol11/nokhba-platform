import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    major: '',
    university: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword, studentId, major, university } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
      setMessage({ type: 'danger', text: 'كلمتا المرور غير متطابقتين' });
      setIsLoading(false);
      return;
    }

    const userData = { name, email, password, studentId, major, university };
    const result = await register(userData);

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
          <h2>إنشاء حساب جديد</h2>
          <p>انضم إلى منصة نخبة وابدأ رحلتك التعليمية</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              الاسم الكامل *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="أدخل اسمك الكامل"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني *
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                كلمة المرور *
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

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                تأكيد كلمة المرور *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="********"
                value={confirmPassword}
                onChange={onChange}
                required
                minLength="6"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="studentId" className="form-label">
              الرقم الجامعي
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              className="form-control"
              placeholder="أدخل رقمك الجامعي (اختياري)"
              value={studentId}
              onChange={onChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="major" className="form-label">
                التخصص
              </label>
              <input
                type="text"
                id="major"
                name="major"
                className="form-control"
                placeholder="علوم حاسب (اختياري)"
                value={major}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="university" className="form-label">
                الجامعة
              </label>
              <input
                type="text"
                id="university"
                name="university"
                className="form-control"
                placeholder="اسم الجامعة (اختياري)"
                value={university}
                onChange={onChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login">سجل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
