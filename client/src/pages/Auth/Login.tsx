import { useForm } from 'react-hook-form';
import { useAuth } from '../../store/auth';
import axios from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Label from '../../components/ui/Label';
import Card from '../../components/ui/Card';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post('/auth/login', data);
            setToken(res.data.token);
            setUser(res.data.user);

            res.data.user.role === 'manager'
                ? navigate('/manager')
                : navigate('/engineer');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <Card>
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register('email')} />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register('password')} />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Card>
        </div>
    );
};

export default Login;
