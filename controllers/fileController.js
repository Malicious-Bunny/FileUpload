const PrismaClient = require('@prisma/client').PrismaClient;

const supabaseClient = require('../config/supabaseclient');

const prisma = new PrismaClient();

async function fileControllerGet(req, res){
    const fileID = Number(req.params.id);
    
    //get file
    const file = await prisma.file.findUnique({
        where: {
            id: fileID
        }
    });
    const authorID = file.userId

    //get user name using authorID
    const author = await prisma.user.findUnique({
        where: {
            id: authorID
        }
    });


    res.render('file', {file: file, author: author.name});
}

module.exports = {
    fileControllerGet
}