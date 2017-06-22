import * as THREE from 'three';

// import Vertex from './vertex';
// import Edge from './edge';

/** Class representing a graph. */
export default class Graph {
  /** Create default graph. */
  constructor() {

    this.graph = null;
    this.links = [];
    this.nodes = [];

  }

  /**
  * Takes an object representation of the graph and sets default class properties.
  * @param {Object} ob - An object representation of the graph containing properties
  * `links` and `nodes`.
  * @param {Object[]} ob.links - Link representations with `source`, `target` and `weight`.
  * @param {Object[]} ob.nodes - Node representations with a minimum property of `id`
  */
  ingest(ob) {
    if (ob.links) {
      this.links = ob.links;
    }
    if (ob.nodes) {
      this.nodes = ob.nodes;
    }
  }

}
