import * as THREE from 'three';



const DEFAULT_VERTEX_RADIUS = 1;
const DEFAULT_VERTEX_COLOR = 0xffffff;

/** Default class of Vertex of graph. */
export default class Vertex {
  constructor(id, layer, position, geometry, material, value) {

    this.id = id;

    this.geometry = geometry || new THREE.SphereGeometry(DEFAULT_VERTEX_RADIUS, 12, 12);
    this.material = material || new THREE.MeshBasicMaterial({color: DEFAULT_VERTEX_COLOR});
    this.shape = new THREE.Mesh(this.geometry, this.material);
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

  addToScene(scene) {
    scene.add(this.shape);
  }





}
