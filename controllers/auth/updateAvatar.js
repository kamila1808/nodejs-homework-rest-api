const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { Users } = require("../../db/userModel");

// const updateAvatar = async (req, res) => {
//     const { _id } = req.user;
  
//     const avatarDir = path.join(__dirname, "../../public/avatars");
  
//     const { path: tempUpload, originalname } = req.file;
//     const filename = `${_id}_${originalname}`;
  
//     const resultUpload = path.join(avatarDir, originalname);
  
//     await Jimp.read(tempUpload)
//       .then((img) => img.resize(250, 250).write(resultUpload))
//       .catch((error) => error);
  
//     await fs.unlink(tempUpload);
  
//     const avatarURL = path.join("avatar", filename);
//     await Users.findByIdAndUpdate(_id, { avatarURL });
//     res.json({
//       avatarURL,
//     });
//   };

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    await Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(tempUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await Users.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

  module.exports = updateAvatar;