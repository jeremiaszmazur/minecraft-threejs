
import * as THREE from 'three';

function loadTexture(file, filetype = '.png', resourcepack = 'VanillaDefault') {
  const path = `resourcepacks/${resourcepack}/assets/minecraft/textures/${file.replace('minecraft:','')}${filetype}`
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(path);

  textureLoader.load(
    path,
    texture => {
      console.log('Loaded:', texture);
    },
    xhr => {
      console.error('Texture not found:', xhr);
    }
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  return texture;
}

const loadMaterials = () => {
  const files = import.meta.globEager('../resourcepacks/VanillaDefault/assets/minecraft/models/block/*.json');
  let materials = {}

  Object.entries(files).forEach(([filePath, fileContent], index) => {
    const getFaceMaterial = (face) => {
      const texture = fileContent.textures[face.texture.replace('#','')]
      if (!texture) {
        console.warn('Failed load texture face', face)
        return new THREE.MeshBasicMaterial({color: 0xFFFFFF})
      }
      return new THREE.MeshLambertMaterial({ map: loadTexture(texture) })
    }
    const modelName = filePath.replace('../resourcepacks/VanillaDefault/assets/minecraft/models/block/', '').replace('.json', '')
    const modelType = fileContent?.parent?.replace('minecraft:','') || ''
    if (modelType == 'block/cube_all' || modelType === 'block/block') {
      if (fileContent?.textures) {
        const faces = fileContent.elements?.length ? fileContent.elements[0].faces || {} : {}
        if (fileContent.textures?.all) {
          materials[modelName] = {
            id: index,
            name: modelName,
            material: new THREE.MeshLambertMaterial({ map: loadTexture(fileContent.textures.all) })
          }
        } else if(faces.north && faces.south && faces.up && faces.down && faces.west && faces.east) {
          materials[modelName] = {
            id: index,
            name: modelName,
            material: [
              getFaceMaterial(faces.west), // right
              getFaceMaterial(faces.east), // left
              getFaceMaterial(faces.up), // top
              getFaceMaterial(faces.down), // bottom
              getFaceMaterial(faces.south), // front
              getFaceMaterial(faces.north)  // back
            ]
          }
        } else if(faces.north && faces.south && faces.west && faces.east) {
          materials[modelName] = {
            id: index,
            name: modelName,
            material: [
              getFaceMaterial(faces.west), // right
              getFaceMaterial(faces.east), // left
              getFaceMaterial(faces.west), // top
              getFaceMaterial(faces.east), // bottom
              getFaceMaterial(faces.south), // front
              getFaceMaterial(faces.north)  // back
            ]
          }
        } else if(faces.up && faces.down) {
          materials[modelName] = {
            id: index,
            name: modelName,
            material: [
              getFaceMaterial(faces.down), // right
              getFaceMaterial(faces.down), // left
              getFaceMaterial(faces.up), // top
              getFaceMaterial(faces.down), // bottom
              getFaceMaterial(faces.down), // front
              getFaceMaterial(faces.down)  // back
            ]
          }
        } else {
          console.warn('Incomplete textures', modelName)
        }
      }
    } else if (modelType === 'block/cube_column') {
      if (fileContent?.textures?.side && fileContent?.textures?.end) {
        const textureSide = new THREE.MeshLambertMaterial({ map: loadTexture(fileContent.textures.side) });
        const textureEnd = new THREE.MeshLambertMaterial({ map: loadTexture(fileContent.textures.end) });
        materials[modelName] = {
          id: index,
          name: modelName,
          material: [
            textureSide, // right
            textureSide, // left
            textureEnd, // top
            textureEnd, // bottom
            textureSide, // front
            textureSide, // back
          ]
        }
      }
    } else if (modelType === 'block/cube_column_horizontal') {
      if (fileContent?.textures?.side && fileContent?.textures?.end) {
        const textureSide = new THREE.MeshLambertMaterial({ map: loadTexture(fileContent.textures.side) });
        const textureEnd = new THREE.MeshLambertMaterial({ map: loadTexture(fileContent.textures.end) });
        materials[modelName] = {
          id: index,
          name: modelName,
          material: [
            textureEnd, // right
            textureEnd, // left
            textureSide, // top
            textureSide, // bottom
            textureSide, // front
            textureSide, // back
          ]
        }
      }
    }
  });

  return materials
}

export const materials = loadMaterials()