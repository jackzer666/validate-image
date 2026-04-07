import hexInfo from './util/hexInfo.json'

const getHexNumber = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = function (e) {
      const arr = new Uint8Array(e.target.result).subarray(0, 4);
      let hexNumber = "";
      for (let i = 0; i < arr.length; i++) {
        hexNumber += arr[i].toString(16).padStart(2, "0").toUpperCase();
      }
      resolve(hexNumber);
    };

    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

const validateImage = async (file, imageType) => {
  const type = await getHexNumber(file);
  return type.includes(hexInfo[imageType]);
};

export default {
  getHexNumber,
  validateImage
}