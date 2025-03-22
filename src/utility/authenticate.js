export function validatePassword(password) {
    // Regex pattern explanation:
    // ^(?=.*[a-z])       -> at least one lowercase letter
    // (?=.*[A-Z])        -> at least one uppercase letter
    // (?=.*\d)          -> at least one digit
    // (?=.*[@$!%*?&])    -> at least one special character
    // [A-Za-z\d@$!%*?&] -> allows letters, digits, and special characters
    // {8,}               -> minimum length of 8 characters
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

 export function generateOTP() {
    return Math.random().toString().split(".")[1].slice(0, 6)
}

