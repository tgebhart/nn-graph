import * as THREE from 'three';

import Graph from './graph';
import Vertex from './vertex';
import Edge from './edge';

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
  * @param {bool} perturbation - Controls perturbation distance of individual neurons in a layer
  */
  constructor(betweenN=5, betweenL=50, vertical=false, perturbation=1) {

    super();
    this.betweenN = betweenN;
    this.betweenL = betweenL;
    this.vertical = vertical;
    this.perturbation = perturbation;

    this.layers = {};
    this.seen = {};

  }

  getNodePosition(layer, layers) {
    var layers = layers || this.layers;
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;

    y = this.betweenN * layers[layer];
    if (this.perturbation) {
     if (layers[layer] % 2 == 0) {
       z = this.perturbation;
     }
     else {
       z = -this.perturbation;
     }
    }

    x = this.betweenN * layer;

    return new THREE.Vector3(x, y, z);
  }

  updateLayerCount(layer) {
    if (this.layers[layer]) {
      this.layers[layer] += 1;
    }
    else {
      this.layers[layer] = 1;
    }
  }


  /**
  * Creates an architecture-type representation for the graphical layout
  */
  represent() {

    // check that links and nodes have been ingested
    if (!this.links || this.links.length == 0) {
      console.log(new NoLinkDataError('No link data found, please ingest data before creating a representation'))
    }
    if (!this.nodes || this.nodes.lenth == 0) {
      console.log(new NoNodeDataError('No node data found, please ingest data before creating a representation'))
    }

    var vertices = new Array(this.nodes.length);
    var edges = new Array(this.links.length);

    for (var i = 0; i < vertices.length; i++) {
      vertices[i] = new Vertex(this.nodes.id);
    }

    var edge;
    var src;
    var tar;
    var pos;
    for (var i = 0; i < edges.length; i++) {
      edge = this.links[i];
      src = vertices[edge.source];
      tar = vertices[edge.target];

      if (!this.seen[edge.source]) {
        this.updateLayerCount(src.layer);
        pos = this.getNodePosition(src.layer);
        src.setPosition(pos.x, pos.y, pos.z);
        this.seen[edge.source] = 0;
      }
      if (!this.seen[edge.target]) {
        this.updateLayerCount(tar.layer);
        pos = this.getNodePosition(tar.layer);
        src.setPosition(pos.x, pos.y, pos.z);
        this.seen[edge.target] = 0;
      }

      edges[i] = new Edge(src, tar);
      src.addIn(edges[i]);
      tar.addOut(edges[i]);

    }

  }




}


class NoLinkDataError extends Error{}
class NoNodeDataError extends Error{}
