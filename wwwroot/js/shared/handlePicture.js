export default async function handlePicture(picLink, defaultPicture, stateName, callBack) {
    loadImage(picLink)
        .then(img => callBack(stateName, picLink))
        .catch(error =>  callBack(stateName, handleReply2Caller(defaultPicture)));
}
function handleReply2Caller(defaultPicture) {
    switch (defaultPicture) {
        case "R": return "\\image\\default.svg";
    }
}
function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        console.log(url);
        img.addEventListener('load', e => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error( "img not found"));
        });
        img.src = url;
    });
} 