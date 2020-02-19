import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  }

  /**
   * Quando se cria uma function e ela quer ter acesso ao ( this. )
   * criar a function no formato === Arrow Function ===
   */
  hadleInputChange = e => {
    this.setState({
      newTech: e.target.value
    });
  }

  /**
   * Todo state no React é imutável 
   * Neste caso criamos um novo array, copiamos o array ( ...this.state.techs )
   * e no final inserimos a tech ( newTech )
   */
  hadleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: '',
    });
  }

  hadleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech)});
  } 

  /**
   * Executado assim que o comoponente aparece em tela 
   */
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({techs: JSON.parse(techs)})
    }
  }

  /**
   * Executado sempre que houver alterações nas ( props ou state )
   */
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs ) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  /**
   * Executado quando o componente deixa de de existir
   */
  componentWillMount() {}
  
 
  render() {
    return (
      <form onSubmit={this.hadleSubmit}>
        <ul>
          { this.state.techs.map(tech => 
            <TechItem 
              key={tech} 
              tech={tech} 
              onDelete={() => this.hadleDelete(tech)}
            />
          )}

        </ul>

        <input 
          type="text" 
          onChange={this.hadleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Add Tech</button>
      </form>
    );
  }
}

export default TechList;
