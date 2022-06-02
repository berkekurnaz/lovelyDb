const fs = require('fs').promises;

exports.get = async (collectionName, query = []) => {
    try {
        let data = await fs.readFile("./lovelyDb/" + collectionName + ".json", "utf-8");
        let jsonData = JSON.parse(data);
        if (query.length === 0) {
            return jsonData;
        } else {
            return jsonData.filter(query);
        }
    } catch (e) {
        if (e.errno === -4058) {
            try{
                await fs.mkdir("./lovelyDbs");
            }catch{
                
            }
            let data = await fs.writeFile("./lovelyDbs/" + collectionName + ".json", "[]");
        }
        return [];
    }
};

exports.add = async (collectionName, data) => {
    try {
        let fileData = await fs.readFile("./lovelyDb/" + collectionName + ".json", "utf-8");
        let jsonData = JSON.parse(fileData);
        data.id = generateId();
        jsonData.push(data);
        await fs.writeFile("./lovelyDb/" + collectionName + ".json", JSON.stringify(jsonData));
        return data;
    } catch (e) {
        return e;
    }
};

exports.update = async (collectionName, query, data) => {
    try {
        let fileData = await fs.readFile("./lovelyDb/" + collectionName + ".json", "utf-8");
        let jsonData = JSON.parse(fileData);
        let updateIndex = jsonData.findIndex(query);
        jsonData[updateIndex] = {
            id: jsonData[updateIndex].id,
            ...data
        };
        await fs.writeFile("./lovelyDb/" + collectionName + ".json", JSON.stringify(jsonData));
        return data;
    } catch (e) {
        return e;
    }
};

exports.delete = async (collectionName, query) => {
    try {
        let fileData = await fs.readFile("./lovelyDb/" + collectionName + ".json", "utf-8");
        let jsonData = JSON.parse(fileData);
        let deleteIndex = jsonData.findIndex(query);
        if(deleteIndex != -1){
            jsonData.splice(deleteIndex, 1);
            await fs.writeFile("./lovelyDb/" + collectionName + ".json", JSON.stringify(jsonData));
            return true;
        }else{
            return false;
        }
    } catch (e) {
        return e;
    }
};

function generateId(){
    let id = "";
    for (let index = 0; index < 12; index++) {
        let number = Math.floor(Math.random() * 10)   
        id += number.toString();
    }
    return id;
}