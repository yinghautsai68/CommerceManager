import bcrypt from "bcrypt";

const password = "hotdog21";

const hashPassword = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
}

hashPassword();

