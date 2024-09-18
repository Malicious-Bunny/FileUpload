const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const multer = require('multer');
const supabaseClient = require('../config/supabaseclient');

function folderControllerget(req, res){
    res.redirect('/home');
}

async function folderControllerGetWithID(req, res){
    const folderID = Number(req.params.id);
    
    //get foler name
    const folder = await prisma.folder.findUnique({
        where: {
            id: folderID
        }
    });
    const folderName = folder.name;

    //get all files in folder
    const files = await prisma.file.findMany({
        where: {
            folderId: folderID
        }
    });
    res.render('folder', {files: files, name: folderName, id: folderID});
}

async function folderControllerPostWithID(req, res){
    const folderID = Number(req.params.id);
    const userID = Number(req.user.id);
    const file = req.file;

    //create file in prismadb
   
    const folderName = await prisma.folder.findUnique({
        where: {
            id: folderID
        }
    });
    const fileName = file.originalname;    


    //check file mime type and size. if its not an image send status 400 or if its over 5mb

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return res.status(400).send('File type not allowed');
    }
    if(file.size > 5 * 1024 * 1024){
        return res.status(400).send('File size too large');
    }

    
    const { data, error } = await supabaseClient.storage
        .from('Files')
        .upload(`${folderName.name}/${fileName}`, file.buffer,{
            cacheControl: '3600',
            upsert: false
        })
    
    console.log(error);

    
    const newFile = await prisma.file.create({
            data: {
                folderId: folderID,
                name: file.originalname,
                userId: userID,
                size: file.size,
                link: data.path || "error"
                
            }
    }); 

    res.redirect(`/folder/${folderID}`);
}


module.exports = {
    folderControllerget,
    folderControllerGetWithID,
    folderControllerPostWithID
}
