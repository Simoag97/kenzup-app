// Script to set your account to admin role
// Run this with: node set-admin.js YOUR_EMAIL

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

const setAdmin = async (email) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find and update user
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { role: 'admin' } },
            { new: true }
        );

        if (!user) {
            console.log('❌ User not found with email:', email);
            process.exit(1);
        }

        console.log('✅ User updated successfully!');
        console.log('📧 Email:', user.email);
        console.log('👤 Name:', user.name);
        console.log('🔑 Role:', user.role);
        console.log('\n🎉 You are now an admin!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.log('❌ Please provide your email address');
    console.log('Usage: node set-admin.js your@email.com');
    process.exit(1);
}

setAdmin(email);
