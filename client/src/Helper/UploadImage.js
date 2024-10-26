export function readFile(e) {
  let files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    (function (file) {
      var reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        return reader.result;
      };
      reader.readAsDataURL(file);
    })(files[i]);
  }
}
