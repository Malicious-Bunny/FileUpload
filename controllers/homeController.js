const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function homeControllerget(req, res) {
  //grab usernam using id from session and prismadb

  const userID = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userID
    }
  });

  const username = user.name;

  //grab all folders from prismadb
  const folders = await prisma.folder.findMany({
    where: {
      userId: userID
    }
  });
  console.log(folders);
  res.render('home', {folders: folders, username: username});
}

async function homeControllerPost(req, res) {
  //grab folder name from form
  const folderName = req.body.folder;
  console.log(req.body);
  //grab user id from session
  const userID = req.user.id;
  //create folder in prismadb
  const folder = await prisma.folder.create({
    data: {
      userId: userID,
      name: folderName
    }
  });
  homeControllerget(req, res);
}


module.exports = {
    homeControllerPost,
    homeControllerget
}