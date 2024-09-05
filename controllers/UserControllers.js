import User from "../model/UserModel.js";

export const getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users',
            error: error.message
        });
    }
};

// Fungsi untuk mengambil data user berdasarkan ID
export const getUserById = async (req, res) => {
    try {
        // Mengambil id dari URL parameter
        const id = req.params.id;

        // Mencari user berdasarkan id
        const user = await User.findOne({
            where: { id: id }
        });

        // Jika user tidak ditemukan, kirim response 404
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Jika user ditemukan, kirim data user
        res.status(200).json({
            success: true,
            message: 'User found',
            data: user
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user by ID',
            error: error.message
        });
    }
};

// Fungsi untuk membuat user baru
export const createUser = async (req, res) => {
    try {
        // Mengambil data dari body request
        const { name, email, gender } = req.body;

        // Validasi sederhana untuk memastikan semua field diisi
        if (!name || !email || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, email, gender)'
            });
        }

        // Membuat user baru
        const newUser = await User.create({
            name,
            email,
            gender
        });

        // Mengirim respons sukses
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while creating user',
            error: error.message
        });
    }
};

// Fungsi untuk memperbarui user berdasarkan ID
export const updateUser = async (req, res) => {
    try {
        // Mengambil id dari URL parameter
        const id = req.params.id;
        const { name, email, gender } = req.body;

        // Validasi untuk memastikan setidaknya salah satu field diisi
        if (!name && !email && !gender) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update (name, email, gender)'
            });
        }

        // Mencari user berdasarkan id
        const user = await User.findByPk(id);

        // Jika user tidak ditemukan, kirim response 404
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Memperbarui data user
        await user.update({
            name: name || user.name,
            email: email || user.email,
            gender: gender || user.gender
        });

        // Mengirim respons sukses
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating user',
            error: error.message
        });
    }
};

// Fungsi untuk menghapus user berdasarkan ID
export const deleteUser = async (req, res) => {
    try {
        // Mengambil id dari URL parameter
        const id = req.params.id;

        // Mencari user berdasarkan id
        const user = await User.findByPk(id);

        // Jika user tidak ditemukan, kirim response 404
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Menghapus user
        await user.destroy();

        // Mengirim respons sukses
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting user',
            error: error.message
        });
    }
};
