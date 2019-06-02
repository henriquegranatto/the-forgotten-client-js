const otbm2json = require("./otbm2json.js")

// FUNÇÃO QUE RETORNA O OTBM JSON CONVERTIDO
const convert = (otbm) =>
{
    return {
        "version":      otbm.data.version,
        "width":        otbm.data.mapWidth,
        "height":       otbm.data.mapHeight,
        "tilewidth":    32,
        "tileheight":   32,
        "orientation":  "orthogonal",
        "properties":   {},
        "layers":       setLayers(otbm.data.nodes),
        "tilesets":     
        [{
            "firstgid":     1,
            "image":        "tileset.png",
            "imageheight":  240,
            "imagewidth":   192,
            "margin":       0,
            "name":         "Tile",
            "properties":   {},
            "spacing":      0,
            "tileheight":   48,
            "tilewidth":    48
        }],
    }
}

// FUNÇÃO QUE GERA OS LAYERS
const setLayers = (otbmNodes) =>
{
    let response = []

    otbmNodes.map((node) => {
        node.features.map((feature) => {
            response.push({
                "width":    feature.x,
                "height":   feature.y,
                "x":        feature.x,
                "y":        feature.y,
                "type":     node.type,
                "name":     node.description,
                "visible":  true,
                "opacity":  1,
                "data":     setLayerData(feature.x, feature.y),
            })
        })
    })

    return response
}

// FUNÃO QUE GERA A MATRIZ NECESSÁRIO PARA RENDERIZAR O MAPA
const setLayerData = (width, height) =>
{
    const response = []
    const lenght = width * height

    for(let i = 0; i < lenght; i++)
    {
        response.push(0)
    }

    return response
}

const otbm = otbm2json.read("./otbm.otbm")
console.log(convert(otbm))