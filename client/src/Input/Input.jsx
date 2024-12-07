import React, { useState } from 'react'
import './Input.css'
import { useForm, ValidationError } from '@formspree/react';

function Input({ closeFormModal }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [state, handleSubmit] = useForm("xkndynjp");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!isSubmitting) { 
            setIsSubmitting(true);
            closeFormModal()
            try {
                await handleSubmit(e);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="form-overlay">
            <form method='POST' onSubmit={handleFormSubmit}>
                <div className='bg_fff'>
                    <div className='for_img_input'>
                        <img onClick={closeFormModal} src="../img/Group 24.png" alt="" />
                    </div>

                    <div className='box_input'>
                        <p> <input name='name' id='name' type="text" className='input_1' placeholder='Введите ваше имя' value={formData.name} onChange={handleChange} required /></p>
                        <ValidationError
                            prefix="Name"
                            field="name"
                            errors={state.errors}
                        />
                        <p> <input name='email' id='email' type="email" className='input_1' placeholder='Введите ваш Email' value={formData.email} onChange={handleChange} required /></p>
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                        <textarea className='textarea_' placeholder='Введите текст сообщения' id='message' name="message" cols="30" rows="10" value={formData.message} onChange={handleChange} required ></textarea>
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                        <button type='submit' className='send' disabled={isSubmitting}>Отправить</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Input
