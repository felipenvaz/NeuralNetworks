import Neuron from './Neuron';

export default class Layer {
    constructor(private nodesNumber: number, private outputConnections: number, private nodes: Neuron[] = null, private outputWeights: number[][] = null) {

        if (!this.outputWeights) {
            this.outputWeights = [];
            for (let i = 0; i < this.outputConnections; i++) {
                this.outputWeights[i] = [];
                for (let i2 = 0; i2 < this.nodesNumber; i2++) {
                    this.outputWeights[i][i2] = Math.random();
                }
            }
        }

        if (!this.nodes) {
            this.nodes = [];
            for (let i = 0; i < this.nodesNumber; i++) {
                const neuron = new Neuron();
                this.nodes.push(neuron);
            }
        }
    }

    public getHtml(label?: string) {
        const layerDiv = document.createElement('div');
        layerDiv.className = 'layer';
        if (label) {
            const divLabel = document.createElement('div');
            divLabel.innerText = label;
            divLabel.className = 'label';
            layerDiv.appendChild(divLabel);
        }

        this.nodes.forEach(n => {
            layerDiv.appendChild(n.getHtml());
        });

        return layerDiv;
    }

    public activateNodes(inputValues: number[]): number[] {
        const outputValues = [];

        for (let i = 0; i < this.outputConnections; i++) {
            const activeValues = inputValues.map((inputValue, idx) => this.nodes[idx].activate(inputValue));

            outputValues[i] = activeValues.reduce((acc, value, idx) => {
                return acc + (value * this.outputWeights[i][idx]);
            }, 0);
        }

        return outputValues;
    }

    public setNodes(nodes: Neuron[]) {
        this.nodes = nodes;
    }

    public getClone(): Layer {
        return new Layer(this.nodesNumber,
            this.outputConnections,
            this.nodes.map(n => n.getClone()),
            this.outputWeights.map(w => [...w]));
    }
}