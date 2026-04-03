export const registerValidator = (data) => {
    const { email, password, number, location, latitude, longitude, user_type } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;

    if (!password || password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }

    if (!number || number.length !== 10) {
        return { success: false, message: "Number must be 10 digits" };
    }

    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid Email" };
    }

    if (!numberRegex.test(number)) {
        return { success: false, message: "Invalid Mobile Number" };
    }

    if (!location || !latitude || !longitude || !user_type) {
        return { success: false, message: "All fields required" };
    }

    
    return { success: true };
};