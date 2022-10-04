const cifrado = (mensaje, llave) => {
        var afterEncrypt = CryptoJS.DES.encrypt(mensaje, CryptoJS.enc.Utf8.parse(llave), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
        }).toString()
        return afterEncrypt
}

const descifrado = (mensaje, llave) => {
        var afterDecrypt = CryptoJS.DES.decrypt(mensaje, CryptoJS.enc.Utf8.parse(llave), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        return afterDecrypt
}

const loadFileCif = async (file) => {
        const secretKey = document.getElementById('clave').value;
        const name = file.name.substring(0, file.name.indexOf("."));
        let text = await file.text();
        const newtext = cifrado(text, secretKey);
        download(`${name}Cifrado.txt`, newtext);
}

const loadFileDes = async (file) => {
        const secretKey = document.getElementById('clave').value;
        const name = file.name.substring(0, file.name.indexOf("."));
        let text = await file.text();
        const newtext = descifrado(text, secretKey);
        download(`${name}Descifrado.txt`, newtext);
}

const download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
}