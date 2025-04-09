import { useState } from "react"
import './sign_in.css' 
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { motion } from "framer-motion"; 
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from '../../components/ToastContext';


const Sign_in = () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();
    const {toast} = useContext(ToastContext)
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.status === 400) {
            alert('Invalid credentials')
        }else{
            const resData = await res.json()
            if(resData.token) {
                localStorage.setItem('user:token', resData.token)
                localStorage.setItem('user:detail', JSON.stringify(resData.user));
                toast.success(`Logged in successfully as ${data.email}`);
                navigate('/');
            }
        }
    }
  return (
    <div className="signin h-screen flex items-center justify-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white w-[670px] h-[550px] shadow-lg rounded-3xl flex flex-col justify-center items-center"
        >
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-extrabold"
            >
                Welcome Back
            </motion.div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-light mb-14"
            >
                Sign in to get explored
            </motion.div>
            <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center w-full" 
                onSubmit={(e) => handleSubmit(e)}
            >
                <Input 
                    label="Email address" 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    className="mb-6 w-[75%] transform transition-all duration-300 hover:scale-105 focus:scale-105" 
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <Input 
                    label="Password" 
                    type="password" 
                    name="password" 
                    placeholder="Enter your Password" 
                    className="mb-14 w-[75%] transform transition-all duration-300 hover:scale-105 focus:scale-105" 
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-[75%]"
                >
                    <Button 
                        label='Sign in' 
                        type='submit' 
                        className="w-full mb-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 transition-all duration-300" 
                    />
                </motion.div>
            </motion.form>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
            >
                Didn't have an account?
                <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-primary cursor-pointer underline ml-2" 
                    onClick={() => navigate('/users/sign_up')}
                >
                    Sign up
                </motion.span>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Sign_in;