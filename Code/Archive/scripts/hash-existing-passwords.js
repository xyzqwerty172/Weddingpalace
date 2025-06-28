import bcrypt from "bcrypt";
import prisma from "../src/utils/db.js";

const saltRounds = 12;

async function hashExistingPasswords() {
  try {
    console.log("Starting password hashing migration...");
    
    // Get all users with plain text passwords
    const users = await prisma.user.findMany();
    
    console.log(`Found ${users.length} users to update`);
    
    for (const user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2)
      if (user.password.startsWith('$2')) {
        console.log(`User ${user.username}: Password already hashed, skipping`);
        continue;
      }
      
      console.log(`Hashing password for user: ${user.username}`);
      
      // Hash the plain text password
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      
      // Update user with hashed password
      await prisma.user.update({
        where: { username: user.username },
        data: { password: hashedPassword }
      });
      
      console.log(`✓ Updated password for user: ${user.username}`);
    }
    
    console.log("Password hashing migration completed successfully!");
    
  } catch (error) {
    console.error("Error during password hashing migration:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
hashExistingPasswords();