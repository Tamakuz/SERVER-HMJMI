const listener = ({ app }) => {
  app.listen(5000, () => {
    console.log("Server Runing.......");
  });
};

export default listener