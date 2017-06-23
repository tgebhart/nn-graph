import * as THREE from 'three';

import Vertex from './vertex';

export default class Edge {
  constructor(vs, ve, weight, material) {

    this.start = vs;
    this.end = ve;
    this.material = material || new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1.0,
      linewidth: 0.5
    });

    this.weight = weight;

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(this.start.shape.position);
    this.geometry.vertices.push(this.end.shape.position);

    this.shape = new THREE.Line(this.geometry, this.material);

  }

  addToScene(scene) {
    scene.add(this.shape);
  }


}
