import admin from "firebase-admin";

const getImage = async (req, res, next) => {
  const { filename, foldername } = req.params;
  const path = `${foldername}/${filename}`;
  try {
    const storageRef = admin.storage().bucket().file(path);
    const url = await storageRef.getSignedUrl({
      action: "read",
      expires: Date.now() + 86400 * 1000, // Set expiry date of the URL
    });
    res.status(200).send(url);
    return;
  } catch (error) {
    console.error(error);
  }
};

export default getImage
