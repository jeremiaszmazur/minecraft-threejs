import * as THREE from 'three';
import { materials } from './materials'

export const blocks = {
  ...materials,
  empty: {
    id: 0,
    name: 'empty',
    visible: false
  },
  grass: {
    id: 1,
    name: 'grass',
    material: materials.grass_block.material
  },
  dirt: {
    id: 2,
    name: 'dirt',
    material: materials.dirt.material
  },
  stone: {
    id: 3,
    name: 'stone',
    material: materials.stone.material,
    scale: { x: 30, y: 30, z: 30 },
    scarcity: 0.8
  },
  coalOre: {
    id: 4,
    name: 'coal_ore',
    material: materials.coal_ore.material,
    scale: { x: 20, y: 20, z: 20 },
    scarcity: 0.8
  },
  ironOre: {
    id: 5,
    name: 'iron_ore',
    material: materials.iron_ore.material,
    scale: { x: 40, y: 40, z: 40 },
    scarcity: 0.9
  },
  tree: {
    id: 6,
    name: 'tree',
    visible: true,
    material: materials.oak_log.material,
  },
  leaves: {
    id: 7,
    name: 'leaves',
    visible: true,
    material: materials.azalea_leaves.material
  },
  sand: {
    id: 8,
    name: 'sand',
    visible: true,
    material: materials.sand.material
  },
  cloud: {
    id: 9,
    name: 'cloud',
    visible: true,
    material: new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })
  }
};

export const resources = [
  blocks.stone,
  blocks.coalOre,
  blocks.ironOre
];