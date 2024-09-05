import Mahasiswa from "../model/MahasiswaModel.js";

// Menapilkan seluruh data mahasiswa
export const getMahasiswa =  async (req, res) => {
    try{
        const mhs = await Mahasiswa.findAll();
        res.status(200).json({
            success: true,
            message: 'Data mahasiswa successfull',
            data: mhs
        })
    }catch(error){
        console.log('Erorr fetching Mahasiswa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetcing Mahasiswa',
            error: error.message
        });
    }
};

//Mengambil data mahasiswa by id
export const getMahasiswaById =  async (req, res) => {
    try{
        const id = req.params.id;
        const mahasiswa = await Mahasiswa.findOne({
            where: { id: id}
        });

        if(!mahasiswa){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } 

        res.status(200).json({
            success: true,
            message: 'Data mahasiswa found',
            data: mahasiswa
        });
        

    }catch(error){
        console.log('Erorr fetching Mahasiswa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user by ID',
            error: error.message
        });
    }
};

//Menambah data mahasiswa
export const createMahasiswa = async (req, res) => {
    try {
        const { npm, name, prodi } = req.body;
        
        // Cek apakah npm sudah ada
        const existingMahasiswa = await Mahasiswa.findOne({ where: { npm } });
        if (existingMahasiswa) {
            return res.status(400).json({
                success: false,
                message: "NPM sudah ada, gunakan NPM lain"
            });
        }

        const newMahasiswa = await Mahasiswa.create({
            npm,
            name,
            prodi
        });

        res.status(201).json({
            success: true,
            message: 'User berhasil disimpan',
            data: newMahasiswa
        });
    } catch (error) {
        console.log('Error fetching Mahasiswa:', error.message);
        
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server error while creating mahasiswa',
                error: error.message
            });
        }
    }
};

//Mengubah data mahasiswa
export const updateMahasiswa =  async (req, res) => {
    try{
        const id = req.params.id;
        const {npm, name, prodi} = req.body;

        if(!npm && !name && !prodi){
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa not found'
            });
        } 

        const mahasiswa = await Mahasiswa.findByPk(id);

        if (!mahasiswa) {
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa not found'
            });
        }

        // Memperbarui data mahasiswa
        await mahasiswa.update({
            npm: npm || mahasiswa.npm,
            name: name || mahasiswa.name,
            prodi: prodi || mahasiswa.prodi
        });

        res.status(200).json({
            success: true,
            message: 'Data mahasiswa found',
            data: mahasiswa
        });
        

    }catch(error){
        console.log('Erorr fetching Mahasiswa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching mahasiswa by ID',
            error: error.message
        });
    }
};

export const deleteMahasiswa = async (req, res) => {
    try{

        const id = req.params.id;
        const mahasiswa = await Mahasiswa.findByPk(id);

        if (!mahasiswa) {
            return res.status(404).json({
                success: false,
                message: 'Mahasiswa not found'
            });
        }

        await mahasiswa.destroy();

        res.status(200).json({
            success: true,
            message: 'Data mahasiswa found',
            data: mahasiswa
        });

    }catch(error){
        console.error('Error deleting mahasiswa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting mahasiswa',
            error: error.message
        });
    }
}

