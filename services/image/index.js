import admin from "firebase-admin";

const getImage = async (req, res, next) => {
  try {
    const bucket = admin.storage().bucket();
    const { filename } = req.params;
    const file = bucket.file(filename);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 86400 * 1000,
    });
    res.status(200).send(url);
  } catch (error) {
    console.log(error);
  }
};

export default getImage
