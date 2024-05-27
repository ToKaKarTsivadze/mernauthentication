import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log('first');
        setData({});
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('erori:', error);
    }
  };

  return (
    <form onSubmit={loginUser}>
      <label>E-mail</label>
      <input
        type="email"
        placeholder="enter a E-mail..."
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <label>password</label>
      <input
        type="password"
        placeholder="enter a password..."
        value={data.password}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <button type="submit">login</button>
    </form>
  );
}
