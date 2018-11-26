export default class Neuron {
    constructor(private applyBias = true, private bias = parseFloat(Math.random().toFixed(4))) {
    }

    public activate(inputValue: number) {
        if (this.applyBias)
            return this.sigmoid(inputValue + this.bias);
        else
            return inputValue;
    }

    public getHtml() {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'input-node';
        inputDiv.innerText = this.bias.toString();
        return inputDiv;
    }

    private sigmoid(z) {
        return 1 / (1 + Math.exp(-z));
    }

    public getClone(): Neuron {
        return new Neuron(this.applyBias, this.bias);
    }
}