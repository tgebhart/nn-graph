import * as THREE from 'three';

import Vertex from './vertex';

export default class Edge {
  constructor(vs, ve, material) {

    this.start = vs;
    this.end = ve;
    this.material = material || new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1.0,
      linewidth: 2
    });

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(new THREE.Vector3(this.start.position));
    this.geometry.vertices.push(new THREE.Vector3(this.end.position));

    this.line = new THREE.Line(this.geometry, material);

  }

  addToScene() {
    scene.add(this.line);
  }


}
