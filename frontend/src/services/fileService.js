import axios from '../config/axios';

const API_URL = '/api/files';

// رفع ملف
export const uploadFile = async (formData, onUploadProgress) => {
  try {
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'حدث خطأ أثناء رفع الملف' };
  }
};

// الحصول على جميع الملفات
export const getFiles = async (params = {}) => {
  try {
    const res = await axios.get(API_URL, { params });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'حدث خطأ أثناء تحميل الملفات' };
  }
};

// الحصول على ملف محدد
export const getFile = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'حدث خطأ أثناء تحميل الملف' };
  }
};

// حذف ملف
export const deleteFile = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'حدث خطأ أثناء حذف الملف' };
  }
};

// الحصول على ملفاتي
export const getMyFiles = async () => {
  try {
    const res = await axios.get(`${API_URL}/user/my-files`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'حدث خطأ أثناء تحميل ملفاتك' };
  }
};

// تحميل ملف
export const downloadFile = (id, fileName) => {
  window.open(`${API_URL}/download/${id}`, '_blank');
};
