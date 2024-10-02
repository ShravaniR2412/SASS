import User from '../models/users.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { ownerName, salonName, licenseNumber, email, password, location } = req.body;

  try {
    // Input validation
    if (!ownerName || !salonName || !licenseNumber || !email || !password || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      ownerName,
      salonName,
      licenseNumber,
      email,
      password,
      location, // Add location here
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Send response indicating successful registration
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using middleware to get user info from token

    // Find the user by ID
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ data: user }); // Return user data
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


