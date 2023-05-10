import admin from "firebase-admin";

const getImage = async (req, res, next) => {
  const { filename } = req.params;
  const folderNames = ["collages", "lectures", "works"];
  for (let i = 0; i < folderNames.length; i++) {
    const folderName = folderNames[i];
    const path = `${folderName}/${filename}`;
    try {
      const storageRef = admin.storage().bucket().file(path);
      const url = await storageRef.getSignedUrl({
        action: "read",
        expires: Date.now() + 86400 * 1000, // Set expiry date of the URL
      });
      res.status(200).senFile(url);
      return;
    } catch (error) {
      console.error(error);
    }
  }
};

export default getImage
