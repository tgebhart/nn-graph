import * as THREE from 'three';

import Graph from './graph';
// import Vertex from './vertex';
// import Edge from './edge';

/**
 * Class handling architecture-type representation of neural network.
 * @extends Graph
 */
export default class Network extends Graph {
  /**
  * Constructor for the Network subclass of Graph. Represents an architecture-type
  * view of a neural network
  * @constructor
  * @param {number} betweenN - The space between each neuron in a layer.
  * @param {number} betweenL - The space between each layer.
  * @param {bool} vertical - Controls whether to render network vertically (instead of outwards in z direction)
  * @param {bool} perturb - Controls whether to perturb individual neurons in a layer
  */
  constructor(betweenN=5, betweenL=50, vertical=false, perturb=true) {

    super();
    this.betweenN = betweenN;
    this.betweenL = betweenL;
    this.vertical = vertical;
    this.perturb = perturb;
    this.vertices = [];

  }


  /**
  * Creates an architecture-type representation for the graphical layout
  */
  represent() {

    // check that links and nodes have been ingested
    if (!this.links || this.links.length == 0) {
      console.log(new NoLinkDataError('No link data found, please ingest data before creating a representation'))
    }
    if (!this.nodes || this.links.lenth == 0) {
      console.log(new NoNodeDataError('No node data found, please ingest data before creating a representation'))
    }

    var vertices = new Array(this.nodes.length);
    var edges = new Array(this.links.length);

    for (var i = 0; i < vertices.length; i++) {
      vertices[i] = new Vertex(this.nodes.id);
    }

    var edge;
    for (var i = 0; i < edges.length; i++) {

    }

  }




}


class NoLinkDataError extends Error{}
class NoNodeDataError extends Error{}
