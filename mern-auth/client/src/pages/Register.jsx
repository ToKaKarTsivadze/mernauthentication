import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    console.log(data);
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/register', {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Login succesfull, welcome');
        navigate('/Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <label>name</label>
      <input
        type="text"
        placeholder="enter a name..."
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
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
      <button type="submit">submit</button>
    </form>
  );
}
