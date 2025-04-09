import { useState, useContext } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useNavigate } from 'react-router-dom';
import './sign_up.css'
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from '../../components/ToastContext';
import { motion } from "framer-motion";

const Form = () => {
    const [data, setData] = useState({
        fullName:'',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const {toast} = useContext(ToastContext)
    const handleSubmit = async(e) => {
        console.log('data :>> ', data);
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.status === 400) {
            alert('Invalid credentials')
        }else{
            navigate('/users/sign_in'); 
            toast.success(`Registered successfully as ${data.email}`);
        }
    }

    return (
        <div className="signup h-screen flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-[700px] h-[600px] shadow-lg rounded-3xl flex flex-col justify-center items-center"
            >
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-extrabold"
                >
                    Welcome
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-light mb-14"
                >
                    Sign up to get started
                </motion.div>
                <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center w-full" 
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <Input 
                        label="Full name" 
                        name="name" 
                        placeholder="Enter your full name" 
                        className="mb-6 w-[75%] transform transition-all duration-300 hover:scale-105 focus:scale-105" 
                        value={data.fullName} 
                        onChange={(e) => setData({ ...data, fullName: e.target.value })} 
                    /> 
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
                            label='Sign Up' 
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
                    Already have an account?
                    <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className="text-primary cursor-pointer underline ml-2" 
                        onClick={() => navigate('/users/sign_in')}
                    >
                        Sign in
                    </motion.span>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Form;