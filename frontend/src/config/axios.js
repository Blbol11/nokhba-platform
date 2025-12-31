import axios from 'axios';

// تحديد الـ Base URL بناءً على البيئة
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// إعداد Axios
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// إضافة Token تلقائياً إذا كان موجود
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
