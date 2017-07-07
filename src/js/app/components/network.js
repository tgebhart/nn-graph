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
  constructor(betweenN=2, betweenL=50, vertical=false, perturbation=0) {

    super();
    this.betweenN = betweenN;
    this.betweenL = betweenL;
    this.vertical = vertical;
    this.perturbation = perturbation;

    this.layers = {};
    this.seen = {};

    this.currentX = 0;
    this.currentY = 0;
    this.perimeterPos = 0;

    this.vertices = [];
    this.edges = [];

  }

  getNodePosition(layer, layers) {
    var layers = layers || this.layers;
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;

    // if (layers[layer] % 2 == 0) {
    //     y = this.betweenN * layers[layer];
    // }
    // else {
    //   y = -this.betweenN * layers[layer];
    // }

    x = layers[layer]['currentX'];
    y = layers[layer]['currentY'];

    if (layers[layer]['currentX'] == layers[layer]['currentY']) {
      layers[layer]['currentX'] = layers[layer]['currentX'] + this.betweenN;
      layers[layer]['currentY'] = 0;
      layers[layer]['perimeterPos'] = 0;
    } else {
      if (layers[layer]['perimeterPos'] % 2 == 1) {
        var tX = layers[layer]['currentX'];
        layers[layer]['currentX'] = layers[layer]['currentY'];
        layers[layer]['currentY'] = tX + this.betweenN;
      } else {
        var tX = layers[layer]['currentX'];
        layers[layer]['currentX'] = layers[layer]['currentY'];
        layers[layer]['currentY'] = tX;
      }
      layers[layer]['perimeterPos'] = layers[layer]['perimeterPos'] + 1;
    }

    if (this.perturbation) {
     if (layers[layer]['count'] % 2 == 0) {
       y = y + this.perturbation;
     }
     else {
       y = y - this.perturbation;
     }
    }

    z = this.betweenL * layer;

    return new THREE.Vector3(x, y, z);
  }

  updateLayerCount(layer) {
    if (this.layers[layer]) {
      this.layers[layer]['count'] += 1;
    }
    else {
      var t = {
        'currentX' : 0,
        'currentY' : 0,
        'perimeterPos' : 0,
        'count' : 1
      }
      this.layers[layer] = t;
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
    var vGeo = new THREE.BoxGeometry(1, 1, 0);
    var vMat = new THREE.MeshBasicMaterial({color: 0x0ffff});

    for (var i = 0; i < vertices.length; i++) {
      vertices[i] = new Vertex(this.nodes[i].id, this.nodes[i].layer, undefined, vGeo, vMat, this.nodes[i].channel);
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
        //console.log(pos);
        src.setPosition(pos.x, pos.y, pos.z);
        this.seen[edge.source] = true;
      }
      if (!this.seen[edge.target]) {
        this.updateLayerCount(tar.layer);
        pos = this.getNodePosition(tar.layer);
        //console.log(pos);
        tar.setPosition(pos.x, pos.y, pos.z);
        this.seen[edge.target] = true;
      }

      edges[i] = new Edge(src, tar, edge.weight);
      src.addIn(edges[i]);
      tar.addOut(edges[i]);

    }
    this.vertices = vertices;
    this.edges = edges;
  }

  addToScene(scene, channels) {
    for (var i = 0; i < this.vertices.length; i++) {
      //console.log(this.vertices[i]);
      if (channels.includes(this.vertices[i].channel)) {
          this.vertices[i].addToScene(scene);
      }

    }
    for (var i = 0; i < this.edges.length; i++) {
      //console.log(this.edges[i]);
      if (channels.includes(this.edges[i].start.channel) && channels.includes(this.edges[i].end.channel)) {
        this.edges[i].addToScene(scene);
      }
    }
  }




}


class NoLinkDataError extends Error{}
class NoNodeDataError extends Error{}
