import connectDB from '../../app/db';
import User from '../../app/models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export default async function handler(req, res) {
  const { method } = req;


  if (method === 'POST') {
    const { username, email, password } = req.body;

    // User Registration
    if (req.query.action === 'register') {
      try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ message: 'Username already taken' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          return res.status(409).json({ message: 'Email already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'User registration failed', error: error.message });
      }
    }

    // User Login
    else if (req.query.action === 'login') {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, "1254poiuytr789", { expiresIn: '1h' });


        console.log(token)
        res.status(200).json({ email: user.email, username: user.username, token });

      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}