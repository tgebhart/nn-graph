import * as THREE from 'three';

/** Default class of Vertex of graph. */
export default class Vertex {
  constructor(id, position, layer, geometry, material, value) {

    this.id = id;

    this.geometry = geometry || new THREE.SphereGeometry(5, 32, 32);
    this.material = material || new THREE.MeshBasicMaterial({color: 0xffff00});
    this.shape = new THREE.Mesh(geometry, material);
    if (position) {
      this.shape.position.x = position.x;
      this.shape.position.y = position.y;
      this.shape.position.z = position.z;
    } else {
      this.shape.position.x = 0;
      this.shape.position.y = 0;
      this.shape.position.z = 0;
    }

    this.layer = layer;
    this.value = value;
    this.ins = [];
    this.outs = [];

  }

  setPosition(x, y, z) {
    this.shape.position.x = x;
    this.shape.position.y = y;
    this.shape.position.z = z;
  }

  setMaterial(material) {
    this.material = material;
  }

  setGeometry(geometry) {
    this.geometry = geometry;
  }

  setId(id) {
    this.id = id;
  }

  setValue(val) {
    this.value = val;
  }

  addIn(e) {
    this.ins.push(e);
  }

  addOut(e) {
    this.outs.push(e);
  }





}
