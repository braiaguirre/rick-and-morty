export default function validation({name, email, password, confirmPassword}) {
    const errors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
    
    if (!name.length) errors.name = 'Enter a valid name.';
    if (!emailRegex.test(email)) errors.email = 'Enter a valid email.';
    if (!passwordRegex.test(password)) errors.password = 'Enter a valid password.';
    if (confirmPassword !== password) errors.confirmPassword = 'Passwords does not match.';

    return errors;
}