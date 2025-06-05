export const findObjectsByClassInObjectsLayer = (classParam, tilemap) => {
    const result = [];
    tilemap.objects.forEach(function (element) {
        if (element.name === "objectsLayer") {
            element.objects.forEach(function (element2) {
                if (element2.type === classParam) {
                    element2.y -= tilemap.tileHeight;
                    result.push(element2);
                }
            });
        }
    });
    
    return result;
};