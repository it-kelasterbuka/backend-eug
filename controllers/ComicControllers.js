import { where } from "sequelize";
import Comic from "../model/ComicModel.js"

export const getComic = async (req, res) => {
    try {
        const comic = await Comic.findAll();
        res.status(200).json({
            succes: true,
            message: 'Comic fetching sucessfully',
            data: comic
        })
    } catch (error) {
        console.log('Error fetching comic', error.message);
        res.status(500).json({
            succes: false,
            message: 'Server error while fatching comic',
            error: error.message
        });
    }
}

//Membuat comic get by id
export const getComicById = async (req, res) => {
    try {
        //Mengambil parameter url id
        const id = req.params.id;

        //Mencari comic berdasarkan id
        const comic = await Comic.findOne({
            where: {id:id}
        })

        //Jika comic tidak ditemukan, kirim respone 404
        if (!comic) {
            return res.status(404).json({
                succes: false,
                message: 'Comic not found'
            })
        }else{
            return res.status(200).json({
                succes: true,
                message: 'Comic found',
                data: comic
            })
        }

    } catch (error) {
        console.log('Error fetching comic', error.message);
        res.status(500).json({
            succes: false,
            message: 'Server error while by id not fatching comic',
            error: error.message
        });
    }
}

//Membuat create comic
export const createComic = async (req, res) => {
    try {
        //mengambil data body
        const {title, author, genre, releaseDate} = req.body;

        //validasi sederhana memastikan semua data terisi
        if (!title || !author || !genre || !releaseDate) {
            return res.status(400).json({
                succes: false,
                message: 'Tolong isi semua data comic'
            })
        }

        const newComic = await Comic.create({
            title,
            author,
            genre,
            releaseDate
        })

        res.status(201).json({
            succes: true,
            message: 'Comic created sucessfully',
            data: newComic
        })
        
    } catch (error) {
        console.log('Error create comic', error.message);
        res.status(500).json({
            succes: false,
            message: 'Server error while created fatching comic',
            error: error.message
        });
    }
}

//Membuat update data comic
export const updateComic = async (req, res) => {
    try {
        // Mengambil id dari URL parameter
        const id = req.params.id;
        const {title, author, genre, releaseDate} = req.body;

        // Validasi untuk memastikan setidaknya salah satu field diisi
        if (!title && !author && !genre && !releaseDate) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update comic'
            });
        }

        // Mencari comic berdasarkan id
        const comic = await Comic.findByPk(id);

        // Jika comic tidak ditemukan, kirim response 404
        if (!comic) {
            return res.status(404).json({
                success: false,
                message: 'Comic not found'
            });
        }

        // Memperbarui data comic
        await comic.update({
            title: title || comic.title,
            author: author || comic.author,
            genre: genre || comic.genre,
            releaseDate: releaseDate || comic.releaseDate
        });

        // Mengirim respons sukses
        res.status(200).json({
            success: true,
            message: 'Comic updated successfully',
            data: comic
        });
    } catch (error) {
        console.error('Error updating comic:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating comic',
            error: error.message
        });
    }
}

//Delete comic set by id
export const deleteComic = async (req, res) => {
    try {
        // Mengambil id dari URL parameter
        const id = req.params.id;

        //Mencari komic berdasarkan by id
        const comic = await Comic.findByPk(id);

        // Jika comic tidak ditemukan, kirim response 404
        if (!comic) {
            return res.status(404).json({
                success: false,
                message: 'Comic not found'
            });
        }

        // Menghapus comic
        await comic.destroy();

        // Mengirim respons sukses
        res.status(200).json({
            success: true,
            message: 'Comic delete comic successfully'
        });
    } catch (error) {
        console.error('Error deleteing comic:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while delete comic',
            error: error.message
        });
    }
}