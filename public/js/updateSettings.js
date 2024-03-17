import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url: url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data update successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
