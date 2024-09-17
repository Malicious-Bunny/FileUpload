const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const multer = require('multer');

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
    console.log(files);
    res.render('folder', {files: files, name: folderName, id: folderID});
}

async function folderControllerPostWithID(req, res){
    const folderID = Number(req.params.id);
    const userID = Number(req.user.id);
    const file = req.file;
    console.log(file);

    //create file in prismadb
    const newFile = await prisma.file.create({
        data: {
            folderId: folderID,
            name: file.originalname,
            link: file.path,
            userId: userID
        }
    });
    console.log(newFile);
    res.redirect(`/folder/${folderID}`);
}


module.exports = {
    folderControllerget,
    folderControllerGetWithID,
    folderControllerPostWithID
}
