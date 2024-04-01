var crypto = require("crypto");

const cryptPassword = (password) => {
  const iterations = 100000;
  const keylen = 64; // Length of the derived key
  const digest = "sha512";
  try {
    // Generate a salt
    const salt = "This!sPuzzleGam3".toString("hex");

    // Hash the password using the generated salt
    const derivedKey = crypto.pbkdf2Sync(
      password,
      salt,
      iterations,
      keylen,
      digest
    );
    const hash = derivedKey.toString("hex");

    // Return the hashed password
    return hash;
  } catch (error) {
    console.log(password, "erere");
    throw error;
  }
};

const comparePassword = async function (plainPass, hashedPassword) {
  try {
    // Compare the password
    const hash = await cryptPassword(plainPass);
    return hashedPassword === hash;
  } catch (error) {
    console.error("Error while comparing password:", error);
    throw error;
  }
};

module.exports = { cryptPassword, comparePassword };
