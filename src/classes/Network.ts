import Layer from './Layer';
import Neuron from './Neuron';

export default class Network {
    private inputLayer: Layer = null;
    private outputLayer: Layer = null;
    private readonly hiddenLayersNumber = 3;
    private readonly neuronsPerLayer = 3;
    private hiddenLayers: Layer[] = [];

    constructor(private inputNumber: number, private outputNumber: number) {
        this.inputLayer = new Layer(this.inputNumber, this.neuronsPerLayer);
        this.outputLayer = new Layer(this.outputNumber, 0);

        for (let i = 0; i < this.hiddenLayersNumber; i++) {
            this.hiddenLayers[i] = new Layer(this.neuronsPerLayer, i === this.hiddenLayersNumber - 1 ? this.outputNumber : this.neuronsPerLayer);
        }
    }

    public getHtml() {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'network';
        inputDiv.appendChild(this.inputLayer.getHtml('Input'));

        const hiddenLayerDiv = document.createElement('div');
        hiddenLayerDiv.className = 'hidden-layer';
        this.hiddenLayers.forEach(l => {
            hiddenLayerDiv.appendChild(l.getHtml());
        });
        inputDiv.appendChild(hiddenLayerDiv);

        inputDiv.appendChild(this.outputLayer.getHtml('Output'));
        return inputDiv;
    }

    public thinkAndReturn(inputValues: number[]) {
        this.inputLayer.setNodes(inputValues.map(o => new Neuron(false, o))); // input number is set as bias just to make it be shown when retrieving html. The value is not actually used
        let outputs = this.inputLayer.activateNodes(inputValues);
        this.hiddenLayers.forEach(layer => {
            outputs = layer.activateNodes(outputs);
        });

        this.outputLayer = new Layer(this.outputNumber, 0, outputs.map(o => new Neuron(false, o))); // input number is set as bias just to make it be shown when retrieving html. The value is not actually used
        return outputs;
    }
}