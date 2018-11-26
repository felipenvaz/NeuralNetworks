import Network from './classes/Network';

const root = document.getElementById('root');
const POPULATION_SIZE = 100;
const GENERATIONS = 100;

const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min;
}

const getInputs = () => {
    return [getRandom(1, 100), getRandom(1, 100)];
};

const checkAnswer = (inputs, outputs) => {
    if (inputs[0] >= inputs[1]) return outputs[0] >= outputs[1];
    if (inputs[0] < inputs[1]) return outputs[0] < outputs[1];
};

const getScore = (inputs, outputs) => {
    if (inputs[0] >= inputs[1]) return outputs[0] - outputs[1];
    if (inputs[0] < inputs[1]) return outputs[1] - outputs[0];
};

let population: Network[] = [];
for (let i = 0; i < POPULATION_SIZE; i++) {
    population.push(new Network(2, 2));
}
const start = new Date();

const run = (n) => {
    let generationCount = 0;
    let allCorrectCount = 0;
    while (allCorrectCount < 1000 || generationCount >= 500000) {
        let allCorrect = true;
        const inputValues = getInputs();
        const outputs = [];
        const newPopulation = [];
        const scores = [];

        population.forEach((network, idx) => {
            outputs[idx] = network.thinkAndReturn(inputValues);
            if (!checkAnswer(inputValues, outputs[idx])) {
                allCorrect = false;
                newPopulation[idx] = new Network(2, 2);
            } else {
                newPopulation[idx] = population[idx];
            }
            scores[idx] = getScore(inputValues, outputs[idx]);
        });

        if (allCorrect) allCorrectCount++;

        population = newPopulation;
        generationCount++;
    }

    console.log(`Run #${n}`);
    console.log(`Generations needed: ${generationCount}`);
}

for(let i = 0; i < 2; i++){
    run(i + 1);
}

console.log(`Time: ${((new Date()).getTime() - start.getTime()) / 1000} seconds`);

/* const network = new Network(2, 2);

root.appendChild(network.getHtml());

setTimeout(() => {
    const outputs = network.thinkAndReturn([5, 4]);
    root.innerHTML = '';
    root.appendChild(network.getHtml());
}, 1000); */