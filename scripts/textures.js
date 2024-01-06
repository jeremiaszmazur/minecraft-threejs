
import * as THREE from 'three';

function loadTexture(file, type = 'block', filetype = '.png', resourcepack = 'VanillaDefault') {
  const path = `resourcepacks/${resourcepack}/assets/minecraft/textures/${type}/${file}${filetype}`
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


export const textures = {
  dirt: loadTexture('dirt'),
  dirtSide: loadTexture('dirt_path_side'),
  dirtTop: loadTexture('dirt_path_top'),
  grass: loadTexture('grass_block_top'),
  grassSide: loadTexture('grass_block_side'),
  grassTop: loadTexture('grass_block_top'),
  stone: loadTexture('stone'),
  coalOre: loadTexture('coal_ore'),
  ironOre: loadTexture('iron_ore'),
  leaves: loadTexture('azalea_leaves'),
  treeSide: loadTexture('oak_log'),
  treeTop: loadTexture('oak_log_top'),
  sand: loadTexture('sand')
};