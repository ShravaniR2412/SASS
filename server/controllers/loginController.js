import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import bcrypt from 'bcryptjs';

// Login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    // Include licenseNumber in the response
    res.status(200).json({
      token,
      licenseNumber: user.licenseNumber, // Retrieve and send licenseNumber from the user record
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
