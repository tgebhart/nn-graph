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
    this.geometry.vertices.push(new THREE.Vertex(this.start.position));
    this.geometry.vertices.push(new THREE.Vertex(this.end.position));

  }


}
