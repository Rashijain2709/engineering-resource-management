import { useForm } from 'react-hook-form';
import { useAuth } from '../../store/auth';
import axios from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Label from '../../components/ui/Label';
import Card from '../../components/ui/Card';
import { User } from '../../types';
import React from 'react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async (data: any) => {
        setError(null);
        try {
            const res = await axios.post('/auth/login', data);
            setToken(res.data.token);
            setUser(res.data.user as User);
            res.data.user.role === 'manager'
                ? navigate('/manager')
                : navigate('/engineer');
        } catch (err: any) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <Card className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 pb-2 w-2/3 mx-auto">Login</h2>
                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
                    </div>
                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow"
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Login;
