function sigmoid(a){
  return (1/(1 + Math.exp(-a)))
}
function sigmoidderivative(y){
  // where passed argument y is sigmoid(x)
  return y*(1-y);
}

class NN{
  constructor(input_nodes, hidden_nodes, output_nodes){
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.learning_rate = 0.1;

    this.weight_ih = new Matrix(this.hidden_nodes,this.input_nodes);
    this.weight_ho = new Matrix(this.output_nodes,this.hidden_nodes);
    this.weight_ho.randomize();
    this.weight_ih.randomize();

    this.bias_ih = new Matrix(this.hidden_nodes,1);
    this.bias_ho = new Matrix(this.output_nodes,1);
    //this.bias_ho.randomize();
    //this.bias_ih.randomize();
  }

  predict(inputarray){
    let input = Matrix.fromArray(inputarray);
    let hidden = Matrix.multiply(this.weight_ih, input);
    // hidden.map(Number);
    // console.log(hidden.toArray());
    // console.log(hidden.data[1])
    hidden.add(this.bias_ih);
    // console.log(hidden.toArray());
    hidden.map(sigmoid);
    // console.log(hidden.toArray());

    // calculate the guess as output
    let output = Matrix.multiply(this.weight_ho, hidden);
    output.add(this.bias_ho);
    // console.log(output.toArray());
    output.map(sigmoid);

    console.log(output.toArray());
    return output.toArray();
  }
  train(inputarray, known){
    // feedforward
    let input = Matrix.fromArray(inputarray);
    let hidden = Matrix.multiply(this.weight_ih, input);
    hidden.add(this.bias_ih);
    hidden.map(sigmoid);
    // calculate the guess as output
    let output = Matrix.multiply(this.weight_ho, hidden);
    output.add(this.bias_ho);
    output.map(sigmoid);

    // error calculation
    known = Matrix.fromArray(known);
    let output_errors =  Matrix.subtract(known, output)
    // delta-weight (hidden to output) calculation
    let gradient = Matrix.map(output, sigmoidderivative);
    gradient.multiply(output_errors);
    gradient.multiply(this.learning_rate);
    let hidden_trans = Matrix.transpose(hidden);
    let weight_ho_change = Matrix.multiply(gradient,hidden_trans);
    // correction of weight_ho
    this.weight_ho.add(weight_ho_change);

    //backpropagation of output error to hidden
    let weight_ho_trans = Matrix.transpose(this.weight_ho);
    let hidden_errors = Matrix.multiply(weight_ho_trans, output_errors);
    //delta-weight (input to hidden) calculation
    let gradient_ih = Matrix.map(hidden, sigmoidderivative);
    gradient_ih.multiply(hidden_errors);
    gradient_ih.multiply(this.learning_rate);
    let input_trans = Matrix.transpose(input);
    let weight_ih_change = Matrix.multiply(gradient_ih,input_trans);
    //correction of weight_ih
    this.weight_ih.add(weight_ih_change);

    //correction of biases both ho & ih
    this.bias_ho.add(gradient);
    this.bias_ih.add(gradient_ih);

  }

}
