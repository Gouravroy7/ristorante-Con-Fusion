import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import DishDetails from './DishDetails';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      // selectedDish : null
      comments : COMMENTS,
      promotions : PROMOTIONS,
      leaders : LEADERS
    };
  }

  // onDishSelect(dishId) {
  //   this.setState({selectedDish : dishId});
    
  // }

  render(){
   const HomePage = () => {
     return(
       <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
       promotion={this.state.promotions.filter((promo) => promo.featured)[0]} 
       leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
     )
   }

    const DishWithId = ({match}) => {
      return(
      <DishDetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }

    

   return (
    <div className="App">
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick = {(dishId) => this.onDishSelect(dishId)}/>
        <DishDetails dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />   */}

        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/aboutus" component={() => <About leaders={this.state.leaders}/>} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
     </div>
    );
  }
}

export default Main;
